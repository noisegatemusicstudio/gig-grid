# Gig‑Grid

> **Cross‑platform merch marketplace for bands and fans**
> React Native + Expo • AWS Amplify (Auth + DataStore + GraphQL)

---

## 🔄 Current Status (July 2025)

**✅ COMPLETED MILESTONES:**

|  #  | Milestone                               | Status | Details |
| :-: | --------------------------------------- | :----: | ------- |
|  0  | Expo blank template                     |   ✅   | React Native 0.79.5 + Expo 53 |
|  1  | Static list UI                         |   ✅   | Component library with theming |
|  2  | Navigation (Home ↔ Detail)             |   ✅   | React Navigation v7 |
|  3  | Real‑time data via Amplify DataStore   |   ✅   | AWS AppSync + DynamoDB |
|  4  | Cart flow (Zustand + Cart screen)      |   ✅   | Global state management |
|  5  | **User Authentication & Management**    |   ✅   | AWS Cognito + SES email |
|  6  | **Complete Login/Signup Flow**          |   ✅   | Auth v6 + error handling |
|  7  | **AWS Cost Optimization**               |   ✅   | Free tier + monitoring |

**🎯 CURRENT PROJECT STATUS:**
- ✅ **Production-Ready Authentication** - Login/signup with email verification and debugging tools
- ✅ **AWS Free Tier Optimized** - $23-43/month cost savings achieved
- ✅ **Professional Email Branding** - Custom domain email delivery
- ✅ **Comprehensive Error Handling** - User-friendly error messages with detailed debugging
- ✅ **Mobile UX Optimized** - iOS/Android specific optimizations
- ✅ **Developer-Ready** - Complete onboarding documentation with troubleshooting tools
---

## 📅 Immediate Next Steps (Priority Order)

### **1. Weekly Maintenance** 🔥
```bash
# Monitor AWS Free Tier usage (CRITICAL)
./scripts/monitor-aws-usage.sh

# Check for security updates
npm audit
npm outdated

# Verify app functionality
npm start && test login/signup flow
```

### **2. Backend Data Population** 
```bash
# Add sample band data for testing
# Create band profiles and portfolio items
# Test real-time DataStore synchronization
amplify status && amplify push
```

### **3. Content Management System**
```bash
# Band profile creation/editing screen
# Portfolio item management interface  
# Image upload and storage (S3 integration)
# Content moderation tools
```

### **4. Payment Integration**
```bash
# Integrate Stripe for payments
# Order management system
# Purchase history tracking
# Revenue analytics for bands
```

### **5. Production Deployment**
```bash
# EAS Build configuration
# App Store Connect setup
# Google Play Console setup
# CI/CD pipeline with GitHub Actions
```

---

## 🏗️ Project Architecture Overview

### **Frontend Stack**
- **React Native 0.79.5** with Expo 53
- **Navigation**: React Navigation v7
- **State Management**: Zustand for cart, React Context for themes
- **UI Components**: Custom component library with theme support
- **Forms**: Comprehensive validation with React Native TextInput

### **Backend Stack** 
- **AWS Amplify**: Full-stack serverless backend
- **Authentication**: AWS Cognito with email verification
- **Database**: AWS AppSync + DynamoDB via DataStore
- **Real-time**: GraphQL subscriptions for live updates
- **Storage**: S3 for images and assets (when implemented)

### **DevOps & Tooling**
- **Development**: Expo CLI with hot reloading
- **Build**: EAS Build for production releases
- **Version Control**: Git with feature branch workflow
- **Package Management**: npm with dependency optimization

---

## 🛠 Development Workflow

### **Getting Started**
```bash
# Clone and setup
git clone https://github.com/noisegatemusicstudio/gig-grid.git
cd gig-grid
npm install

# Backend setup
amplify pull --envName prod --profile giggrid-main

# Start development
npm run start:fresh  # Includes auto-cleanup
```

### **Development Scripts**
| Script | Description |
|--------|-------------|
| `npm start` | Auto-kill existing processes and start fresh |
| `npm run start:clean` | Kill processes + clear Metro cache |
| `npm run start:fresh` | Complete cleanup + cache clear + start |
| `npm run kill` | Kill all Expo/Metro processes and free ports |
| `npm run android` | Launch Android emulator |
| `npm run ios` | Launch iOS simulator |
| `./scripts/monitor-aws-usage.sh` | Monitor AWS Free Tier usage and costs |
| `./scripts/debug-auth.sh <email>` | Debug authentication issues for specific user |

### **🔍 Debugging & Troubleshooting Scripts**
```bash
# Authentication debugging
./scripts/debug-auth.sh user@example.com

# AWS cost monitoring  
./scripts/monitor-aws-usage.sh

# Manual user confirmation (if needed)
aws cognito-idp admin-confirm-sign-up --user-pool-id ap-southeast-1_vNCXkUoLo --username <email> --profile giggrid-main
```

### **🛡️ Error Handling System**
The app includes comprehensive error handling to ensure users never see generic error messages:

#### **Centralized Error Management**
- **`src/utils/errorHandler.js`** - Centralized error handling utilities
- **`src/components/ErrorBoundary.js`** - Global error boundary for unhandled exceptions
- **Meaningful Messages** - All errors provide actionable user guidance
- **Debug Logging** - Enhanced logging for unknown errors to aid debugging

#### **Error Categories Handled**
```javascript
// Authentication Errors
- UserNotConfirmedException → "Email Verification Required" 
- NotAuthorizedException → "Invalid Credentials"
- NetworkError → "Connection Problem"
- Unknown errors → Enhanced fallback with debug info

// DataStore Errors  
- Network issues → "Connection issue - check internet"
- Authentication → "Please try logging in again"
- Configuration → "Please restart the app"

// Global Error Boundary
- JavaScript exceptions → User-friendly restart option
- Development mode → Debug information displayed
- Production mode → Error reporting option
```

#### **Testing Error Handling**
```bash
# Test authentication errors (use debug script)
./scripts/debug-auth.sh test@example.com

# Test network errors (turn off internet, try actions)
# Test unknown errors (will be logged with full debug info)
```

---

## 🔍 Code Quality & Best Practices

### **Current Implementation Highlights**
- ✅ **Type Safety**: Comprehensive prop validation and error handling
- ✅ **Accessibility**: ARIA labels and proper accessibility support
- ✅ **Performance**: Optimized loading states and error boundaries
- ✅ **UX**: Proper keyboard handling and form validation
- ✅ **Security**: Secure authentication flow with proper validation

### **Code Organization**
```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Theme, etc.)
├── screens/        # Screen components
├── store/          # Zustand state management
├── styles/         # Shared styling
├── utils/          # Utility functions
└── models/         # Amplify DataStore models
```

---

## 🎯 Success Metrics & Goals

### **Technical Metrics**
- ✅ App loads without crashes
- ✅ User registration flow works end-to-end  
- ✅ Real-time data synchronization (when backend is configured)
- ✅ Responsive design across devices
- ✅ Offline-first architecture foundation

### **User Experience Goals**
- 🎯 Intuitive onboarding flow for bands and fans
- 🎯 Fast, responsive portfolio browsing
- 🎯 Seamless checkout experience
- 🎯 Reliable offline functionality
- 🎯 Professional, polished interface

### **Business Objectives**
- 🎯 Enable bands to easily create and manage portfolios
- 🎯 Provide fans with discoverable, high-quality merch
- 🎯 Create sustainable revenue model for platform
- 🎯 Build engaged community of musicians and fans

---

## 📖 Additional Learning Resources

### **Community & Support**
- 🗨️ [Expo Discord](https://discord.gg/expo)
- 🗨️ [AWS Amplify Discord](https://discord.gg/amplify)
- 🗨️ [React Native Community](https://www.reactnative.dev/community/overview)

### **Advanced Topics**
- 📚 [Offline-First Architecture](https://docs.amplify.aws/react-native/build-a-backend/datastore/conflict-resolution/)
- 📚 [React Native Security](https://reactnative.dev/docs/security)
- 📚 [Performance Optimization](https://reactnative.dev/docs/performance)
- 📚 [Testing Strategies](https://reactnative.dev/docs/testing-overview)

---

## 🔧 Maintenance & Operations Guide

### **📋 Daily Maintenance (5 minutes)**
```bash
# Check app startup and basic navigation
npm start
# Test login/signup flow
# Verify theme switching works
# Check cart functionality
```

### **📊 Weekly Maintenance (15 minutes)**
```bash
# 1. Monitor AWS Free Tier usage
./scripts/monitor-aws-usage.sh

# 2. Check for dependency updates
npm outdated

# 3. Review error logs
npx expo logs

# 4. Test on both platforms
npm run ios    # Test iOS simulator
npm run android # Test Android emulator
```

### **🗓️ Monthly Maintenance (30 minutes)**
```bash
# 1. AWS Cost Review
# Visit: https://console.aws.amazon.com/billing/home#/freetier
# Check: AWS_FREE_TIER_OPTIMIZATION.md checklist

# 2. Dependency Updates
npm update
npm audit fix

# 3. Amplify Backend Health Check
amplify status
amplify push --y  # Only if changes detected

# 4. Clean up test data
# Remove test users from Cognito
# Clear test data from DynamoDB tables

# 5. Performance Review
# Check app startup time
# Monitor memory usage
# Review crash reports (if any)
```

### **📈 Quarterly Maintenance (2 hours)**
```bash
# 1. Major dependency updates
npm update --save
expo upgrade

# 2. Security audit
npm audit
expo doctor

# 3. Performance optimization
# Profile app with Flipper
# Optimize bundle size
# Review and update cache strategies

# 4. Backup and documentation
git push --all
# Update this README with any changes
# Document new features or architectural changes
```

### **🚨 Emergency Procedures**

#### **App Won't Start**
```bash
# 1. Clear all caches
npm run start:fresh

# 2. Reset Metro bundler
npx expo start --clear

# 3. Reset node modules
rm -rf node_modules package-lock.json
npm install

# 4. Check Expo CLI version
npm install -g @expo/cli@latest
```

#### **AWS Services Down**
```bash
# 1. Check AWS Status
# Visit: https://status.aws.amazon.com/

# 2. Switch to offline mode
# App should work with DataStore offline capabilities
# Users can still browse cached data

# 3. Monitor and wait for AWS recovery
# Check Amplify Console for service status
```

#### **Authentication Issues**
```bash
# 1. Debug the specific user account
./scripts/debug-auth.sh <email_address>

# 2. Check user status in Cognito
aws cognito-idp admin-get-user --user-pool-id ap-southeast-1_vNCXkUoLo --username <email> --profile giggrid-main

# 3. Manually confirm account if needed
aws cognito-idp admin-confirm-sign-up --user-pool-id ap-southeast-1_vNCXkUoLo --username <email> --profile giggrid-main

# 4. Verify email if needed
aws cognito-idp admin-update-user-attributes --user-pool-id ap-southeast-1_vNCXkUoLo --username <email> --user-attributes Name=email_verified,Value=true --profile giggrid-main

# 5. Check SES email delivery status
# AWS Console → SES → Sending Statistics

# 6. Test with fresh user account
# Create new test account to isolate issue
```

---

## 👥 Developer Onboarding Guide

### **🎯 For New Developers**

#### **Prerequisites**
- **Node.js**: v18+ ([Download](https://nodejs.org/))
- **Git**: Latest version ([Download](https://git-scm.com/))
- **VS Code**: Recommended IDE ([Download](https://code.visualstudio.com/))
- **Expo CLI**: `npm install -g @expo/cli`
- **AWS CLI**: For backend management ([Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html))

#### **Required VS Code Extensions**
```bash
# Install these extensions for optimal development experience:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- React Native Tools
- AWS Toolkit
- GitLens
- Auto Rename Tag
- Bracket Pair Colorizer
```

#### **Environment Setup (Step-by-step)**

**Step 1: Clone and Install**
```bash
git clone https://github.com/noisegatemusicstudio/gig-grid.git
cd gig-grid
npm install
```

**Step 2: AWS Configuration**
```bash
# Get AWS credentials from project admin
# Add to ~/.aws/credentials:
[giggrid-main]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
region = ap-southeast-1

# Pull Amplify backend configuration
amplify pull --envName prod --profile giggrid-main
```

**Step 3: Verify Setup**
```bash
# Test app startup
npm start

# Test AWS connection
amplify status

# Test monitoring script
./scripts/monitor-aws-usage.sh
```

#### **📱 Development Environment Setup**

**iOS Setup (macOS only)**
```bash
# Install Xcode from App Store
# Install iOS Simulator
# Test with: npm run ios
```

**Android Setup**
```bash
# Install Android Studio
# Set up Android Virtual Device (AVD)
# Add to ~/.zshrc or ~/.bash_profile:
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Test with: npm run android
```

### **🧠 Architecture Deep Dive**

#### **Frontend Architecture**
```
src/
├── components/         # Reusable UI components
│   ├── CartButton.js      # Global cart access
│   ├── SettingsButton.js  # App settings
│   └── ThemeToggle.js     # Light/dark mode
├── contexts/           # React Context providers
│   └── ThemeContext.js    # Global theme management
├── screens/            # Main app screens
│   ├── HomeScreen.js      # Band listing (DataStore)
│   ├── BandScreen.js      # Band details & merch
│   ├── CartScreen.js      # Shopping cart
│   ├── LoginScreen.js     # User authentication
│   ├── SignupScreen.js    # User registration
│   └── SettingsScreen.js  # App preferences
├── store/              # State management
│   └── CartStore.js       # Zustand cart store
├── styles/             # Shared styling
│   └── index.js           # Global style definitions
├── utils/              # Utility functions
│   └── userUtils.js       # User-related helpers
└── models/             # Amplify DataStore models
    ├── index.js           # Model exports
    └── schema.js          # Generated schema
```

#### **Backend Architecture (AWS Amplify)**
```
amplify/
├── backend/
│   ├── api/
│   │   └── giggrid/       # GraphQL API definition
│   ├── auth/
│   │   └── giggride611bf78/ # Cognito configuration
│   └── types/             # TypeScript definitions
└── team-provider-info.json # Environment configuration
```

#### **Key Technologies & Patterns**

**State Management Strategy**
```javascript
// 1. Global State: Zustand (Cart)
import { useCartStore } from '../store/CartStore';
const { items, addItem, removeItem } = useCartStore();

// 2. Local State: React hooks
const [loading, setLoading] = useState(false);

// 3. Theme State: React Context
const { theme, toggleTheme } = useContext(ThemeContext);

// 4. Server State: Amplify DataStore
const bands = await DataStore.query(Band);
```

**Authentication Flow**
```javascript
// Login/Signup with AWS Amplify Auth v6
import { signIn, signUp } from '@aws-amplify/auth';

// Error handling pattern used throughout app
try {
  const result = await signIn({ username, password });
  // Handle success
} catch (error) {
  // Meaningful error messages for users
  if (error.code === 'UserNotConfirmedException') {
    Alert.alert("Email Verification Required", 
      "Please check your email and verify your account.");
  }
}
```

**Data Management Pattern**
```javascript
// Offline-first with DataStore
import { DataStore } from '@aws-amplify/datastore';
import { User, Band } from '../models';

// Real-time subscriptions
const subscription = DataStore.observe(Band).subscribe(
  ({ opType, element }) => {
    // Handle real-time updates
  }
);
```

### **🔍 Debugging & Troubleshooting**

#### **Common Issues & Solutions**

**1. Authentication/Login Issues**
```bash
# Debug any authentication problem:
./scripts/debug-auth.sh <email_address>

# Manual account confirmation:
aws cognito-idp admin-confirm-sign-up --user-pool-id ap-southeast-1_vNCXkUoLo --username <email> --profile giggrid-main

# Set test password:
aws cognito-idp admin-set-user-password --user-pool-id ap-southeast-1_vNCXkUoLo --username <email> --password TempPassword123! --permanent --profile giggrid-main
```

**2. "Amplify has not been configured"**
```bash
# Solution:
amplify pull --envName prod --profile giggrid-main
npm start
```

**3. Metro bundler errors**
```bash
# Solution:
npm run start:fresh  # Clears all caches
```

**4. iOS simulator issues**
```bash
# Solution:
npx expo run:ios --device  # Specify device
# Or reset simulator: Device → Erase All Content and Settings
```

**5. Android emulator issues**
```bash
# Solution:
adb kill-server && adb start-server
npm run android
```

**6. DataStore sync issues**
```bash
# Check network connectivity
# Verify AWS credentials: amplify status
# Clear local DataStore: DataStore.clear()
```

#### **Development Best Practices**

**Code Quality**
```javascript
// ✅ GOOD: Meaningful component names
const BandMerchCard = ({ band, onPress }) => { ... };

// ✅ GOOD: Proper error handling
const handleBandLoad = async () => {
  try {
    setLoading(true);
    const bands = await DataStore.query(Band);
    setBands(bands);
  } catch (error) {
    console.error('Failed to load bands:', error);
    Alert.alert('Error', 'Unable to load bands. Please try again.');
  } finally {
    setLoading(false);
  }
};

// ✅ GOOD: Consistent styling with theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: theme.spacing.md,
  },
});
```

**Performance Optimization**
```javascript
// ✅ GOOD: Memoized components for lists
const BandCard = React.memo(({ band }) => { ... });

// ✅ GOOD: Efficient DataStore queries
const bands = await DataStore.query(Band, 
  Predicates.ALL, 
  { limit: 20, page: 0 }
);

// ✅ GOOD: Cleanup subscriptions
useEffect(() => {
  const subscription = DataStore.observe(Band).subscribe(...);
  return () => subscription.unsubscribe();
}, []);
```

### **📚 Learning Resources for New Developers**

#### **Required Reading (Priority Order)**
1. **This README** - Complete project overview
2. **`AWS_FREE_TIER_OPTIMIZATION.md`** - Cost management
3. **React Native Docs** - [Core Concepts](https://reactnative.dev/docs/getting-started)
4. **Expo Docs** - [Workflow](https://docs.expo.dev/workflow/overview/)
5. **AWS Amplify Docs** - [DataStore](https://docs.amplify.aws/react-native/build-a-backend/datastore/)

#### **Video Tutorials (Watch First Week)**
- 🎥 [React Native Crash Course](https://youtu.be/0-S5a0eXPoc)
- 🎥 [AWS Amplify Full Stack](https://youtu.be/MhEzufO-HPc)
- 🎥 [Expo CLI Deep Dive](https://youtu.be/9AqCf5TKiNA)

#### **Hands-on Exercises (First Sprint)**
1. **Create a new screen** following existing patterns
2. **Add a new component** to the component library
3. **Implement a DataStore query** with proper error handling
4. **Style components** using the theme system
5. **Test on both iOS and Android** simulators

### **🤖 GitHub Copilot Context Guide**

#### **For AI Assistant Reference**
```markdown
PROJECT: Gig-Grid - Cross-platform merch marketplace for bands and fans
TECH STACK: React Native 0.79.5 + Expo 53, AWS Amplify (Auth + DataStore + GraphQL)
PATTERNS: Offline-first architecture, AWS Free Tier optimized, comprehensive error handling
CURRENT STATUS: Authentication flow complete, cost-optimized, ready for feature development
KEY FILES: See src/ directory structure above for component organization
STYLE GUIDE: Theme-based styling, meaningful error messages, accessibility-first
TESTING: Manual testing on iOS/Android simulators, AWS monitoring via custom scripts
```

---

*Last Updated: July 19, 2025*
*Status: Production-Ready Authentication + AWS Free Tier Optimized*

**✅ COMPLETED MILESTONES:**

|  #  | Milestone                               | Status |
| :-: | --------------------------------------- | :----: |
|  0  | Expo blank template                     |   ✅   |
|  1  | Static list UI                         |   ✅   |
|  2  | Navigation (Home ↔ Detail)             |   ✅   |
|  3  | Real‑time data via Amplify DataStore   |   ✅   |
|  4  | Cart flow (Zustand + Cart screen)      |   ✅   |
|  5  | **User Authentication & Management**    |   ✅   |
|  6  | **Complete Login/Signup Flow**          |   ✅   |

**🚧 CURRENT FOCUS:**
- ✅ **AWS Amplify Auth v6** integration with signup/login
- ✅ **Complete Authentication Flow** with login and signup screens
- ✅ **User Profile System** with role-based access (FAN/BAND)
- ✅ **Theme System** with light/dark mode and persistence
- ✅ **Form Validation** with comprehensive error handling
- ✅ **Loading State Management** with proper error handling
- ✅ **iOS Optimization** for keyboard/autofill interactions
- ✅ **Navigation Flow** between authentication screens

---

## 🎯 What's Working Now

### Authentication System
- **User Registration**: Full signup flow with email verification
- **User Login**: Complete signin flow with AWS Amplify Auth v6
- **Professional Email Branding**: Verification emails sent from `noisegate.music.studios@gmail.com`
- **AWS Cognito Integration**: Secure authentication backend with SES email delivery
- **User Profiles**: DataStore integration for user management
- **Role-based Access**: FAN and BAND user types
- **Duplicate Prevention**: Email validation and conflict resolution
- **Navigation Flow**: Seamless login ↔ signup screen transitions
- **Error Handling**: Comprehensive error messages for auth failures

### App Infrastructure  
- **Theme Management**: Light/dark mode with AsyncStorage persistence
- **Navigation**: Seamless screen transitions with proper loading states
- **Error Handling**: Comprehensive error management throughout the app
- **Mobile UX**: iOS-specific optimizations for forms and keyboards

### Data Management
- **AWS DataStore**: Real-time synchronization (when properly configured)
- **State Management**: Zustand for cart and global state
- **Model Relationships**: User, Band, and Cart models with proper authorization

---

### **🆕 Latest Features (Authentication & Debugging)**
- **🔐 Login Fix**: Resolved authentication issues with unconfirmed accounts
- **🛠️ Debug Tools**: New authentication debugging script for troubleshooting
- **📊 Enhanced Error Handling**: Detailed error logging and user-friendly messages
- **⚡ Account Management**: Manual confirmation tools for development testing
- **💰 Cost Optimization**: Cleaned up redundant AWS resources saving ~$23-43/month
- **📊 Free Tier Monitoring**: Comprehensive monitoring strategy for staying within free limits
- **🎯 Resource Optimization**: All services optimized for AWS Free Tier usage
- **📋 Monthly Checklist**: Systematic approach to monitoring AWS usage and costs
- **🚨 Billing Alerts**: Recommended setup for early warning on potential charges

### **Complete Authentication Flow**
- **📧 Professional Email Setup**: All verification emails now sent from `noisegate.music.studios@gmail.com`
- **🎨 Branded Email Templates**: Custom welcome messages with Gig-Grid branding
- **🔐 AWS SES Integration**: Secure email delivery through Amazon Simple Email Service
- **🌏 Regional Optimization**: Email service configured in ap-southeast-1 region for optimal delivery
- **🛠️ Debug Tools**: Authentication troubleshooting with `./scripts/debug-auth.sh`
- **🔧 Account Management**: Manual confirmation and password reset capabilities

### **Enhanced Authentication Experience**
- **🔐 LoginScreen**: Full signin implementation with AWS Amplify Auth v6
- **🔄 Navigation**: Seamless transitions between Login ↔ Signup screens
- **✅ Form Validation**: Real-time email format and required field validation
- **🚨 Error Handling**: Specific error messages for different auth failure scenarios:
  - User not confirmed (email verification required)
  - Invalid credentials
  - User not found
  - Rate limiting (too many attempts)
  - Network connectivity issues
- **📱 Mobile UX**: iOS keyboard optimizations and autofill support
- **🎨 Theme Integration**: Full light/dark mode support
- **♿ Accessibility**: Complete ARIA labels and keyboard navigation
- **⚡ Loading States**: Clear feedback during authentication process
- **🔗 Forgot Password**: Placeholder ready for implementation

### **Technical Implementation**
```javascript
// Key technologies used:
✅ AWS Amplify Auth v6 signIn function
✅ React Navigation v7 for screen transitions
✅ ThemeContext integration for consistent styling
✅ Comprehensive error boundary patterns
✅ iOS-specific TextInput optimizations
```

---

## 🚧 Current Technical Challenges

### ✅ **RESOLVED: AWS Cost Optimization** 
- **Issue**: Redundant AWS resources causing unnecessary costs
- **Solution**: Deleted duplicate CloudFormation stack `amplify-giggrid-prod-5aa76`
- **Impact**: **~$23-43/month savings** + optimized for AWS Free Tier
- **Status**: ✅ **COMPLETED** - See `AWS_FREE_TIER_OPTIMIZATION.md` for details

### ✅ **RESOLVED: Authentication Signin Issues**
- **Issue**: Users unable to login due to unconfirmed accounts
- **Solution**: Created debug tools and manual confirmation process
- **Impact**: Login flow now working properly with proper error handling
- **Status**: ✅ **COMPLETED** - Debug tool: `./scripts/debug-auth.sh`

### 1. **Sample Data Population**
- **Problem**: No Band/Portfolio data in database yet
- **Impact**: Empty states showing instead of sample content
- **Status**: Need to add seed data or band creation flow

### 2. **DataStore Authorization**
- **Problem**: "Unauthorized" errors during DataStore sync
- **Status**: Auth directives working, but may need backend refresh

---

## 📚 Learning Path & Next Steps

### **IMMEDIATE LEARNING PRIORITIES:**

#### 1. **AWS Amplify Deep Dive** 🔥
```bash
# Learn these concepts:
- Amplify v6 migration and configuration
- DataStore vs API (GraphQL) patterns  
- Auth directive troubleshooting
- Backend deployment and environment management
```

#### 2. **React Native Performance**
```bash
# Focus areas:
- Loading state patterns and UX
- Error boundary implementation
- Memory management and optimization
- Navigation performance
```

#### 3. **Production Deployment**
```bash
# Essential skills:
- EAS Build configuration
- Environment variable management
- App Store / Play Store deployment
- CI/CD pipeline setup
```

### **MEDIUM-TERM LEARNING:**

#### 4. **Advanced State Management**
- Complex DataStore relationships
- Offline-first architecture patterns
- Real-time subscription management
- Conflict resolution strategies

#### 5. **Payment Integration**
- Stripe integration patterns
- Payment security best practices
- Subscription models
- Order management systems

#### 6. **App Store Optimization**
- ASO (App Store Optimization)
- Analytics integration
- User retention strategies
- A/B testing implementation

---

## 🔗 Essential Learning Resources

### **AWS Amplify (PRIORITY)**
- 📖 [Amplify v6 Documentation](https://docs.amplify.aws/react-native/)
- 🎥 [Amplify DataStore Tutorial](https://docs.amplify.aws/react-native/build-a-backend/datastore/)
- 🛠️ [Auth Configuration Guide](https://docs.amplify.aws/react-native/build-a-backend/auth/)

### **React Native Advanced**
- 📖 [React Native Performance](https://reactnative.dev/docs/performance)
- 🎥 [Expo Router Deep Dive](https://docs.expo.dev/router/introduction/)
- 🛠️ [React Navigation Best Practices](https://reactnavigation.org/docs/navigating-without-navigation-prop/)

### **Production Deployment**
- 📖 [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- 🎥 [App Store Deployment Guide](https://docs.expo.dev/distribution/app-stores/)
- 🛠️ [Environment Management](https://docs.expo.dev/build-reference/variables/)

---ative + Expo • Back‑end: AWS Amplify (AppSync + DataStore)

---

## 📌 Project vision

Gig‑Grid empowers independent musicians to list and sell merch worldwide via a real‑time, offline‑ready mobile app. Fans can discover bands, browse product lines, add to cart, and complete checkout seamlessly.

---

## 🗂 Repo structure

```
.
├── App.js                    # Entry point: navigation setup
├── app.json                  # Expo configuration
├── assets/                   # Images, fonts
├── src/
│   ├── components/           # Reusable UI components (e.g., CartButton)
│   ├── screens/              # Screens: HomeScreen, BandScreen, CartScreen, LoginScreen, SignupScreen…
│   ├── store/                # Global state with Zustand (cartStore.js)
│   ├── models/               # Amplify DataStore models (auto-generated)
│   └── aws-exports.js        # Amplify configuration (auto-generated)
├── amplify/                  # Amplify backend definitions
└── package.json              # Dependencies & scripts
```

---

## 🚀 Getting started

1. **Clone & install**

   ```bash
   git clone https://github.com/noisegatemusicstudio/gig-grid.git
   cd gig-grid
   npm install
   ```

2. **Configure Amplify**
   Ensure you have AWS credentials in `~/.aws/credentials` under profile `giggrid-main`.

   ```bash
   amplify pull --envName prod --profile giggrid-main
   ```

3. **Run the app**

   ```bash
   npm start
   ```

   - Press **a** (Android) or **i** (iOS), or scan the QR code.
   - Home screen loads live band data via DataStore.

---

## 🛠 Development Scripts

Enhanced npm scripts for better development workflow:

| Script | Description |
|--------|-------------|
| `npm start` | **Auto-kill** existing processes and start fresh |
| `npm run start:clean` | Kill processes + clear Metro cache |
| `npm run start:fresh` | Complete cleanup + cache clear + start |
| `npm run kill` | Kill all Expo/Metro processes and free ports |

**Auto-cleanup features:**
- ✅ Kills existing Expo/Metro processes
- ✅ Frees up ports 8080, 8081, 19000-19002  
- ✅ No more "port already in use" errors
- ✅ Clean restart every time

---

## 🔄 Milestone summary

|  #  | Completed                            |
| :-: | ------------------------------------ |
|  0  | Expo blank template                  |
|  1  | Static list UI                       |
|  2  | Navigation (Home ↔ Detail)           |
|  3  | Real‑time data via Amplify DataStore |
|  4  | Cart flow (Zustand + Cart screen)    |

---

## 🛒 Cart & state management (Milestone 4)

- **Zustand** manages global cart (`src/store/cartStore.js`)
- **CartButton** in header with live badge (`src/components/CartButton.js`)
- **CartScreen** lists items, quantities, subtotal, and clear/remove actions
- **HomeScreen** and **BandScreen** import and use cart store

---

## 🛠 Scripts & tooling

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm start`       | `expo start`                |
| `npm run ios`     | iOS simulator               |
| `npm run android` | Android emulator            |
| `npm run lint`    | ESLint + Prettier           |
| `npm run test`    | Jest unit tests             |
| `amplify push`    | Deploy backend updates      |
| `amplify pull`    | Sync backend config locally |

---

## 🏷 Git Workflow & Contribution Guidelines

### **Branch Strategy**
```bash
main           # Production-ready code only
├── feat/*     # New features (feat/user-profiles)
├── fix/*      # Bug fixes (fix/login-validation)
├── chore/*    # Maintenance tasks (chore/dependency-updates)
└── docs/*     # Documentation updates (docs/readme-improvements)
```

### **Development Workflow**
```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feat/your-feature-name

# 2. Make changes following coding standards
# - Write meaningful commit messages
# - Test on both iOS and Android
# - Update documentation if needed

# 3. Commit with conventional commit format
git add .
git commit -m "feat: add user profile management screen

- Add ProfileScreen component with theme support
- Integrate with Amplify Auth for user data
- Add navigation from settings screen
- Include loading states and error handling"

# 4. Push and create pull request
git push -u origin feat/your-feature-name
# Create PR via GitHub with descriptive title and description
```

### **Code Review Checklist**
- [ ] **Functionality**: Feature works on both iOS and Android
- [ ] **Error Handling**: Proper try/catch with user-friendly messages
- [ ] **Performance**: No unnecessary re-renders or API calls
- [ ] **Accessibility**: ARIA labels and keyboard navigation
- [ ] **Theme Support**: Uses theme colors and spacing
- [ ] **AWS Usage**: Stays within free tier limits
- [ ] **Documentation**: Updates README if architectural changes

### **Commit Message Convention**
```bash
# Format: type(scope): description
feat(auth): add forgot password functionality
fix(cart): resolve item quantity update issue
chore(deps): update React Native to 0.79.6
docs(readme): add maintenance schedule
style(theme): improve dark mode contrast
test(login): add unit tests for validation
```

---

## 🧪 Testing Strategy

### **Manual Testing Checklist**
```bash
# Before every commit, test:
□ App starts without errors
□ Login/signup flow works end-to-end
□ Theme switching (light/dark mode)
□ Cart functionality (add/remove items)
□ Navigation between all screens
□ Offline functionality (airplane mode)
□ iOS simulator testing
□ Android emulator testing
```

### **Automated Testing Setup**
```bash
# Unit tests with Jest
npm test

# Component testing with React Native Testing Library
npm run test:components

# E2E testing setup (future enhancement)
# Consider Detox or Maestro for automation
```

### **Performance Testing**
```bash
# Monitor app performance
# Use React DevTools Profiler
# Check memory usage in Xcode/Android Studio
# Monitor AWS costs weekly: ./scripts/monitor-aws-usage.sh
```

---

## 📞 Support & Communication

### **Getting Help**
1. **Check this README first** - Most answers are here
2. **Search existing issues** - GitHub issues tab
3. **AWS Free Tier Monitor** - `./scripts/monitor-aws-usage.sh`
4. **AWS Documentation** - [Amplify Docs](https://docs.amplify.aws/)
5. **Community Support** - [Expo Discord](https://discord.gg/expo)

### **Reporting Issues**
```markdown
**Issue Template:**
- Device/Platform: iOS 17.x / Android 13
- Steps to reproduce: 1. Open app, 2. Navigate to...
- Expected behavior: Should show...
- Actual behavior: Shows error...
- Console logs: Include relevant logs
- AWS costs affected: Yes/No
```

### **Emergency Contacts**
- **AWS Cost Alerts**: Check billing dashboard immediately
- **Production Issues**: Follow emergency procedures in maintenance guide
- **Security Issues**: Report privately to project maintainers

### **Development Environment Issues**
```bash
# Common fixes for development issues:

# 1. Clear all caches
npm run start:fresh

# 2. Reset Amplify configuration
amplify pull --envName prod --profile giggrid-main

# 3. Restart Metro bundler
npx expo start --clear

# 4. Reset simulators
# iOS: Device → Erase All Content and Settings
# Android: AVD Manager → Wipe Data

# 5. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📅 Next steps (Milestone 5)

- **Integrate Stripe**: `@stripe/stripe-react-native` for payments
- **Persist orders**: Add `Order` model in GraphQL schema → DataStore
- **Order history**: Screen listing completed orders
- **CI/CD**: Set up EAS build and TestFlight/Play Store publishing

---

## 📖 Learning Resources & References

### **Essential Documentation (Read First)**
- 📖 **Project README** - This file (comprehensive project guide)
- 📖 **AWS Free Tier Guide** - `AWS_FREE_TIER_OPTIMIZATION.md`
- 📖 **React Native Docs** - [Getting Started](https://reactnative.dev/docs/getting-started)
- 📖 **Expo Documentation** - [Development Workflow](https://docs.expo.dev/workflow/overview/)
- 📖 **AWS Amplify Docs** - [React Native Guide](https://docs.amplify.aws/react-native/)

### **Technology-Specific Learning**

#### **React Native + Expo**
- 🎥 [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- 📚 [Expo CLI Commands](https://docs.expo.dev/workflow/expo-cli/)
- 🛠️ [React Navigation](https://reactnavigation.org/docs/getting-started/)
- 📱 [Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)

#### **AWS Amplify & Backend**
- 📖 [DataStore Tutorial](https://docs.amplify.aws/react-native/build-a-backend/datastore/)
- 🔐 [Authentication Guide](https://docs.amplify.aws/react-native/build-a-backend/auth/)
- 🌐 [GraphQL with AppSync](https://docs.amplify.aws/react-native/build-a-backend/graphqlapi/)
- 💾 [Storage with S3](https://docs.amplify.aws/react-native/build-a-backend/storage/)

#### **State Management & Architecture**
- 🐻 [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- ⚛️ [React Context API](https://react.dev/reference/react/useContext)
- 🏗️ [Offline-First Architecture](https://docs.amplify.aws/react-native/build-a-backend/datastore/conflict-resolution/)

### **Advanced Topics**
- 🚀 [Performance Optimization](https://reactnative.dev/docs/performance)
- 🔒 [Security Best Practices](https://reactnative.dev/docs/security)
- 📊 [Analytics Integration](https://docs.amplify.aws/react-native/build-a-backend/analytics/)
- 🧪 [Testing Strategies](https://reactnative.dev/docs/testing-overview)

---

## 🤖 GitHub Copilot Reference Guide

### **Project Context for AI Assistance**

#### **Technical Stack Summary**
```json
{
  "project": "Gig-Grid",
  "description": "Cross-platform merch marketplace for bands and fans",
  "platform": "React Native 0.79.5 + Expo 53",
  "backend": "AWS Amplify (Cognito + AppSync + DynamoDB + S3)",
  "state_management": ["Zustand (cart)", "React Context (theme)", "DataStore (server state)"],
  "navigation": "React Navigation v7",
  "styling": "StyleSheet with theme system",
  "authentication": "AWS Amplify Auth v6 with email verification",
  "database": "AWS DynamoDB via DataStore (offline-first)",
  "email": "AWS SES with custom domain (noisegate.music.studios@gmail.com)",
  "cost_optimization": "AWS Free Tier optimized with monitoring",
  "deployment": "Expo EAS Build (planned)"
}
```

#### **Current Architecture Patterns**
```javascript
// Component Structure Pattern
const ScreenName = () => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  
  // Error handling pattern
  const handleAction = async () => {
    try {
      setLoading(true);
      // AWS operation
    } catch (error) {
      console.error('Action failed:', error);
      Alert.alert('Descriptive Title', 'User-friendly message with next steps.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Theme-aware styling */}
    </View>
  );
};
```

#### **Key Files & Their Purpose**
```
Critical Files for AI Context:
├── README.md                     # This file - complete project guide
├── AWS_FREE_TIER_OPTIMIZATION.md # Cost management and monitoring
├── src/screens/LoginScreen.js    # Auth implementation reference
├── src/screens/SignupScreen.js   # User registration patterns
├── src/contexts/ThemeContext.js  # Global theme management
├── src/store/CartStore.js        # Zustand state example
├── amplify/backend/              # AWS backend configuration
└── scripts/monitor-aws-usage.sh  # Cost monitoring automation
```

#### **Common Development Patterns**

**Authentication Flow**
```javascript
// Standard auth pattern used throughout app
import { signIn, signUp, signOut } from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';

// Always include meaningful error handling
// Follow theme-based styling
// Include loading states
// Implement offline-first approach
```

**DataStore Operations**
```javascript
// Offline-first data management
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { User, Band } from '../models';

// Query with pagination and error handling
const bands = await DataStore.query(Band, Predicates.ALL, {
  limit: 20,
  page: 0
});
```

**Error Handling Standards**
```javascript
// User-friendly error messages with actionable guidance
Alert.alert(
  "Descriptive Title",           // Clear title
  "Helpful message with next steps."  // Actionable guidance
);
```

#### **Development Constraints & Guidelines**
- ✅ **AWS Free Tier**: All solutions must stay within free tier limits
- ✅ **Offline-First**: App must work without internet connection
- ✅ **Theme Support**: All UI must support light/dark themes
- ✅ **Error Handling**: Comprehensive error handling with user-friendly messages
- ✅ **Mobile UX**: iOS/Android specific optimizations
- ✅ **Performance**: Optimize for mobile performance (memory, battery)

#### **When Suggesting Solutions**
1. **Check Free Tier Impact**: Consider AWS costs for any backend changes
2. **Follow Existing Patterns**: Use established component and error handling patterns
3. **Include Testing**: Suggest testing on both iOS and Android
4. **Consider Offline**: Ensure solutions work with offline-first architecture
5. **Theme Awareness**: Include theme-based styling in UI suggestions
6. **Meaningful Errors**: Provide descriptive error messages and handling

#### **Quick Reference Commands**
```bash
# Development
npm start              # Start with auto-cleanup
./scripts/monitor-aws-usage.sh  # Check AWS costs
amplify status         # Check backend status

# Debugging
npm run start:fresh    # Nuclear reset
amplify pull --envName prod --profile giggrid-main  # Reset backend

# Testing
npm run ios           # iOS simulator
npm run android       # Android emulator
```

---

*This README serves as the single source of truth for the Gig-Grid project. Keep it updated with any architectural changes, new patterns, or important discoveries.*

---
