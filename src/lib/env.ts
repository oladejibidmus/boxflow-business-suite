
// Environment configuration for Neon database
// In production, these should be stored as environment variables

export const config = {
  database: {
    // Replace with your actual Neon database connection string
    url: process.env.DATABASE_URL || 'postgresql://username:password@host:port/database',
    
    // Enable/disable database operations (set to false for demo mode)
    enabled: false, // Set to true when you have a real database connection
  },
  
  // Mock data mode - when database is not connected
  mockMode: true,
  
  // API settings
  api: {
    baseUrl: process.env.API_BASE_URL || '/api',
    timeout: 5000,
  }
};

// Helper to check if database is properly configured
export const isDatabaseConfigured = () => {
  return config.database.enabled && config.database.url && 
         !config.database.url.includes('username:password@host');
};
