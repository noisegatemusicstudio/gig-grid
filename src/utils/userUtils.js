// src/utils/userUtils.js
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from 'aws-amplify';
import { User } from '../../models';

/**
 * Check if a user with the given email already exists in DataStore
 * @param {string} email - The email to check
 * @returns {Promise<boolean>} - True if user exists, false otherwise
 */
export const userExistsByEmail = async (email) => {
  try {
    const users = await DataStore.query(User, c => c.email("eq", email.trim().toLowerCase()));
    return users.length > 0;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};

/**
 * Get the current authenticated user's profile from DataStore
 * @returns {Promise<User|null>} - The user profile or null if not found
 */
export const getCurrentUserProfile = async () => {
  try {
    const authUser = await Auth.currentAuthenticatedUser();
    if (!authUser) return null;

    const users = await DataStore.query(User, c => c.email("eq", authUser.attributes.email));
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error('Error getting current user profile:', error);
    return null;
  }
};

/**
 * Create a new user profile in DataStore
 * @param {object} userData - The user data
 * @param {string} userData.email - User's email
 * @param {string} userData.username - User's username
 * @param {string} userData.role - User's role (FAN or BAND)
 * @returns {Promise<User|null>} - The created user or null if failed
 */
export const createUserProfile = async ({ email, username, role }) => {
  try {
    const user = await DataStore.save(new User({
      email: email.trim().toLowerCase(),
      username: username.trim(),
      role: role.toUpperCase(),
    }));
    return user;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return null;
  }
};

/**
 * Get all users from DataStore (useful for admin functions)
 * @returns {Promise<User[]>} - Array of all users
 */
export const getAllUsers = async () => {
  try {
    const users = await DataStore.query(User);
    return users;
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
};

// Legacy Auth functions for compatibility
// Admin function to list all users (requires admin privileges)
export const listAllUsers = async () => {
  try {
    // This requires admin credentials and is typically used in admin panels
    const users = await Auth.listUsers();
    console.log('All users:', users);
    return users;
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  }
};

// Get current authenticated user
export const getCurrentUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    console.log('Current user:', user);
    return user;
  } catch (error) {
    console.log('No authenticated user');
    return null;
  }
};

// Get current user session
export const getCurrentSession = async () => {
  try {
    const session = await Auth.currentSession();
    console.log('Current session:', session);
    return session;
  } catch (error) {
    console.log('No active session');
    return null;
  }
};

// Check if user exists by email (during signup) - using Auth method
export const checkUserExists = async (email) => {
  try {
    // This will throw an error if user doesn't exist
    await Auth.forgotPassword(email);
    return true; // User exists
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      return false; // User doesn't exist
    }
    throw error; // Other error
  }
};
