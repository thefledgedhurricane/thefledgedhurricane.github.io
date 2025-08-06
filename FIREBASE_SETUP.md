# Firebase Contact Form Setup Guide

This guide will help you set up Firebase for your contact form and deploy it to GitHub Pages.

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Enter project name: `academic-portfolio-[your-username]`
4. Disable Google Analytics (optional for contact forms)
5. Click "Create project"

### Step 2: Set up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select your preferred location (closest to your users)
5. Click "Done"

### Step 3: Get Firebase Configuration

1. Go to Project Settings (⚙️ gear icon)
2. Scroll to "Your apps" section
3. Click Web icon (`</>`) to add a web app
4. Register app with nickname: `academic-portfolio`
5. Copy the Firebase config object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### Step 4: Configure Security Rules

1. Go to Firestore Database → Rules
2. Replace default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow writes to contact-messages collection
    match /contact-messages/{document} {
      allow create: if request.auth == null
        && resource == null
        && request.resource.data.keys().hasAll(['name', 'email', 'subject', 'message', 'timestamp'])
        && request.resource.data.name is string
        && request.resource.data.email is string
        && request.resource.data.subject is string
        && request.resource.data.message is string
        && request.resource.data.name.size() <= 100
        && request.resource.data.email.size() <= 100
        && request.resource.data.subject.size() <= 200
        && request.resource.data.message.size() <= 2000;
      allow read: if false; // No public reading
    }
  }
}
```

3. Click "Publish"

## 🚀 GitHub Pages Deployment

### Step 1: Add Firebase Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret" for each:

| Secret Name | Value |
|-------------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Your Firebase API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | your-project-id |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | your-project.appspot.com |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Your Firebase app ID |

### Step 2: Deploy to GitHub Pages

1. Commit and push your changes:
```bash
git add .
git commit -m "Add Firebase contact form"
git push origin main
```

2. GitHub Actions will automatically:
   - Build your Next.js app with Firebase config
   - Deploy to GitHub Pages
   - Your contact form will be live!

### Step 3: Test Your Contact Form

1. Visit your GitHub Pages URL: `https://[username].github.io/[repository]`
2. Navigate to `/contact`
3. Submit a test message
4. Check Firebase Console → Firestore Database → `contact-messages` collection

## 📧 Managing Contact Messages

### View Messages in Firebase Console

1. Go to Firebase Console → Firestore Database
2. Navigate to `contact-messages` collection
3. View all submitted messages with:
   - Name, email, subject, message
   - Timestamp
   - Read status

### Optional: Set up Email Notifications

You can set up Firebase Cloud Functions to send email notifications:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize functions: `firebase init functions`
3. Create a function to send emails when new messages arrive

## 🔒 Security Best Practices

### Firestore Rules Explained

- ✅ **Allow create**: Anyone can submit contact forms
- ❌ **Deny read**: No one can read messages publicly
- ✅ **Validation**: Ensures required fields and data types
- ✅ **Size limits**: Prevents spam with large messages

### Additional Security

1. **Rate Limiting**: Consider adding client-side rate limiting
2. **Honeypot**: Already included in the form
3. **CAPTCHA**: Add reCAPTCHA for extra protection
4. **Domain Restrictions**: Configure in Firebase Console

## 🆘 Troubleshooting

### Common Issues

**"Firebase not initialized"**
- Check environment variables are set correctly
- Verify Firebase config in GitHub Secrets

**"Permission denied"**
- Check Firestore security rules
- Ensure rules allow `create` for `contact-messages`

**"Form not submitting"**
- Check browser console for errors
- Verify Firebase project is active
- Check network tab for failed requests

### Debug Steps

1. Check browser console for errors
2. Verify environment variables in build logs
3. Test Firebase connection locally first
4. Check Firestore rules in Firebase Console

## 💰 Firebase Pricing

**Free Tier Limits (Spark Plan):**
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day
- 1GB storage

**Perfect for contact forms!** You can handle thousands of contact form submissions per month for free.

## 🎉 You're Done!

Your Firebase contact form is now:
- ✅ Fully functional
- ✅ Deployed to GitHub Pages
- ✅ Secure and spam-protected
- ✅ Storing messages in Firestore
- ✅ Ready for production use

Visit your contact page and start receiving messages! 🚀