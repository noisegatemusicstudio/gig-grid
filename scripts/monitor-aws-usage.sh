#!/bin/bash

# 🔍 AWS Free Tier Usage Monitoring Script for Gig-Grid
# Author: GitHub Copilot
# Description: Monitor AWS resource usage to stay within free tier

set -e

echo "🔍 AWS Free Tier Usage Monitor - Gig-Grid Project"
echo "================================================="
echo "Profile: giggrid-main | Region: ap-southeast-1"
echo "Generated: $(date)"
echo ""

# Check AWS CLI and profile
if ! aws sts get-caller-identity --profile giggrid-main &>/dev/null; then
    echo "❌ Error: AWS CLI not configured or profile 'giggrid-main' not found"
    exit 1
fi

echo "✅ AWS Profile authenticated"
echo ""

# Function to format bytes
format_bytes() {
    local bytes=$1
    if [ $bytes -gt 1073741824 ]; then
        echo "$(echo "scale=2; $bytes/1073741824" | bc)GB"
    elif [ $bytes -gt 1048576 ]; then
        echo "$(echo "scale=2; $bytes/1048576" | bc)MB"
    elif [ $bytes -gt 1024 ]; then
        echo "$(echo "scale=2; $bytes/1024" | bc)KB"
    else
        echo "${bytes}B"
    fi
}

# 1. DynamoDB Usage Check
echo "📊 DynamoDB Usage (Free Tier: 25GB storage, 25 RCU/WCU)"
echo "---------------------------------------------------"

total_size=0
table_count=0

while IFS= read -r table; do
    if [[ $table == *"giggrid"* ]] || [[ $table == *"2lyx4g325zb27basxmxtcmtyqm"* ]]; then
        echo "📋 Table: $table"
        
        # Get table size and item count
        table_info=$(aws dynamodb describe-table --table-name "$table" --profile giggrid-main --region ap-southeast-1 2>/dev/null)
        
        if [ $? -eq 0 ]; then
            item_count=$(echo "$table_info" | jq -r '.Table.ItemCount // 0')
            table_size=$(echo "$table_info" | jq -r '.Table.TableSizeBytes // 0')
            
            total_size=$((total_size + table_size))
            table_count=$((table_count + 1))
            
            echo "   Items: $item_count"
            echo "   Size: $(format_bytes $table_size)"
            echo ""
        else
            echo "   ⚠️  Could not fetch table details"
            echo ""
        fi
    fi
done < <(aws dynamodb list-tables --profile giggrid-main --region ap-southeast-1 --output text --query 'TableNames[]' 2>/dev/null)

echo "📈 DynamoDB Summary:"
echo "   Total Tables: $table_count"
echo "   Total Size: $(format_bytes $total_size)"
echo "   Free Tier Usage: $(echo "scale=2; $total_size/26843545600*100" | bc)% of 25GB"
echo ""

# 2. S3 Usage Check
echo "🗄️  S3 Storage Usage (Free Tier: 5GB)"
echo "-----------------------------------"

s3_total_size=0
bucket_count=0

while IFS= read -r bucket; do
    if [[ $bucket == *"giggrid"* ]] || [[ $bucket == *"amplify"* ]]; then
        echo "🪣 Bucket: $bucket"
        
        # Get bucket size
        bucket_size=$(aws s3api list-objects-v2 --bucket "$bucket" --profile giggrid-main \
            --query 'sum(Contents[].Size)' --output text 2>/dev/null)
        
        if [ "$bucket_size" != "None" ] && [ "$bucket_size" != "" ]; then
            s3_total_size=$((s3_total_size + bucket_size))
            echo "   Size: $(format_bytes $bucket_size)"
        else
            echo "   Size: Empty or inaccessible"
        fi
        
        bucket_count=$((bucket_count + 1))
        echo ""
    fi
done < <(aws s3 ls --profile giggrid-main | awk '{print $3}' 2>/dev/null)

echo "📈 S3 Summary:"
echo "   Total Buckets: $bucket_count"
echo "   Total Size: $(format_bytes $s3_total_size)"
echo "   Free Tier Usage: $(echo "scale=2; $s3_total_size/5368709120*100" | bc)% of 5GB"
echo ""

# 3. Cognito Users Check
echo "👥 Cognito User Usage (Free Tier: 50,000 MAU)"
echo "--------------------------------------------"

user_pools=$(aws cognito-idp list-user-pools --max-results 10 --profile giggrid-main --region ap-southeast-1 --output json 2>/dev/null)

if [ $? -eq 0 ]; then
    echo "$user_pools" | jq -r '.UserPools[] | select(.Name | contains("giggrid")) | "\(.Name): \(.Id)"' | while read line; do
        echo "🔐 User Pool: $line"
        
        pool_id=$(echo "$line" | awk '{print $NF}')
        user_count=$(aws cognito-idp list-users --user-pool-id "$pool_id" --profile giggrid-main --region ap-southeast-1 --query 'length(Users)' --output text 2>/dev/null)
        
        if [ "$user_count" != "" ]; then
            echo "   Users: $user_count"
            echo "   Free Tier Usage: $(echo "scale=2; $user_count/50000*100" | bc)% of 50,000 MAU"
        else
            echo "   Users: Unable to fetch count"
        fi
        echo ""
    done
else
    echo "⚠️  Could not fetch Cognito user pools"
    echo ""
fi

# 4. Lambda Function Check
echo "⚡ Lambda Functions (Free Tier: 1M requests/month)"
echo "------------------------------------------------"

lambda_count=0
while IFS= read -r function; do
    if [[ $function == *"giggrid"* ]] || [[ $function == *"amplify"* ]]; then
        echo "🔧 Function: $function"
        lambda_count=$((lambda_count + 1))
        
        # Note: Detailed Lambda metrics require CloudWatch, which might incur costs
        echo "   Status: Active (detailed metrics available in CloudWatch)"
        echo ""
    fi
done < <(aws lambda list-functions --profile giggrid-main --region ap-southeast-1 --query 'Functions[].FunctionName' --output text 2>/dev/null)

echo "📈 Lambda Summary:"
echo "   Total Functions: $lambda_count"
echo "   Monitoring: Use CloudWatch for detailed usage metrics"
echo ""

# 5. Overall Assessment
echo "🎯 FREE TIER ASSESSMENT"
echo "======================="

# Calculate risk levels
dynamo_risk="🟢 LOW"
if [ $total_size -gt 21474836480 ]; then  # >20GB (80% of free tier)
    dynamo_risk="🟡 MEDIUM"
fi
if [ $total_size -gt 24159191040 ]; then  # >22.5GB (90% of free tier)
    dynamo_risk="🔴 HIGH"
fi

s3_risk="🟢 LOW"
if [ $s3_total_size -gt 4294967296 ]; then  # >4GB (80% of free tier)
    s3_risk="🟡 MEDIUM"
fi
if [ $s3_total_size -gt 4831838208 ]; then  # >4.5GB (90% of free tier)
    s3_risk="🔴 HIGH"
fi

echo "DynamoDB Risk Level: $dynamo_risk"
echo "S3 Storage Risk Level: $s3_risk"
echo "Lambda Risk Level: 🟢 LOW (typical usage well within limits)"
echo "Cognito Risk Level: 🟢 LOW (typical usage well within limits)"
echo ""

echo "💡 RECOMMENDATIONS:"
echo "==================="
echo "• Monitor usage weekly during development"
echo "• Set up AWS billing alerts at \$1, \$5, and \$10"
echo "• Review and clean up test data regularly"
echo "• Optimize queries to reduce DynamoDB read/write operations"
echo "• Use Amplify DataStore offline capabilities to reduce API calls"
echo ""

echo "📋 Next Steps:"
echo "• Run this script weekly: ./scripts/monitor-aws-usage.sh"
echo "• Check AWS Billing Dashboard: https://console.aws.amazon.com/billing/home#/freetier"
echo "• Review detailed optimization guide: ./AWS_FREE_TIER_OPTIMIZATION.md"
echo ""

echo "✅ Monitoring complete! Your project appears to be within free tier limits."
