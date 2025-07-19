#!/bin/bash

# 🔧 Authentication Debug Tool for Gig-Grid
# Usage: ./scripts/debug-auth.sh [email]

set -e

echo "🔍 Authentication Debug Tool - Gig-Grid"
echo "======================================"

USER_POOL_ID="ap-southeast-1_vNCXkUoLo"
PROFILE="giggrid-main"

if [ -z "$1" ]; then
    echo "Usage: $0 <email_address>"
    echo "Example: $0 mishra1986@gmail.com"
    exit 1
fi

EMAIL="$1"

echo "🔍 Checking user: $EMAIL"
echo ""

# Check if user exists
echo "1. User Existence Check:"
USER_INFO=$(aws cognito-idp admin-get-user \
    --user-pool-id "$USER_POOL_ID" \
    --username "$EMAIL" \
    --profile "$PROFILE" 2>/dev/null || echo "NOT_FOUND")

if [ "$USER_INFO" = "NOT_FOUND" ]; then
    echo "❌ User not found: $EMAIL"
    echo ""
    echo "🚀 To create this user:"
    echo "   1. Use the signup screen in the app"
    echo "   2. Or create manually: aws cognito-idp admin-create-user --user-pool-id $USER_POOL_ID --username $EMAIL"
    exit 1
fi

echo "✅ User found"
echo ""

# Extract user status and attributes
USER_STATUS=$(echo "$USER_INFO" | jq -r '.UserStatus')
EMAIL_VERIFIED=$(echo "$USER_INFO" | jq -r '.UserAttributes[] | select(.Name=="email_verified") | .Value')
USERNAME=$(echo "$USER_INFO" | jq -r '.Username')

echo "2. User Status Check:"
echo "   Username: $USERNAME"
echo "   Status: $USER_STATUS"
echo "   Email Verified: $EMAIL_VERIFIED"
echo ""

# Provide recommendations
echo "3. Login Requirements:"
if [ "$USER_STATUS" = "CONFIRMED" ] && [ "$EMAIL_VERIFIED" = "true" ]; then
    echo "✅ User can log in!"
    echo "   - Account is confirmed"
    echo "   - Email is verified"
    echo ""
    echo "🧪 Test Login:"
    echo "   Email: $EMAIL"
    echo "   Status: Ready for login"
elif [ "$USER_STATUS" = "UNCONFIRMED" ]; then
    echo "❌ User cannot log in - Account not confirmed"
    echo ""
    echo "🔧 Fix Options:"
    echo "   Option 1 (User): Check email for verification link"
    echo "   Option 2 (Admin): Manually confirm:"
    echo "      aws cognito-idp admin-confirm-sign-up --user-pool-id $USER_POOL_ID --username $EMAIL --profile $PROFILE"
    echo ""
elif [ "$EMAIL_VERIFIED" = "false" ]; then
    echo "⚠️  User may have login issues - Email not verified"
    echo ""
    echo "🔧 Fix Option (Admin):"
    echo "   aws cognito-idp admin-update-user-attributes --user-pool-id $USER_POOL_ID --username $EMAIL --user-attributes Name=email_verified,Value=true --profile $PROFILE"
    echo ""
fi

echo "4. Password Management:"
echo "   🔧 Set temporary password (for testing):"
echo "      aws cognito-idp admin-set-user-password --user-pool-id $USER_POOL_ID --username $EMAIL --password TempPassword123! --permanent --profile $PROFILE"
echo ""

echo "5. User Cleanup (if needed):"
echo "   🗑️  Delete user:"
echo "      aws cognito-idp admin-delete-user --user-pool-id $USER_POOL_ID --username $EMAIL --profile $PROFILE"
echo ""

echo "📱 Next Steps:"
echo "   1. If user is ready: Test login in the app"
echo "   2. If issues persist: Check app console logs for detailed error messages"
echo "   3. For new signups: Ensure email delivery is working (check SES)"
echo ""

echo "✅ Debug complete!"
