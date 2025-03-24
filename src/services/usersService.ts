import axios from 'axios';
import dynamoose from 'dynamoose';
import logger from '../utils/logger';

const EXTERNAL_API_URL = 'https://jsonplaceholder.typicode.com/users';

const CachedResponseSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  data: {
    type: Array, // Store the entire response as a JSON object
  },
  ttl: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000) + 5 * 60, 
  }
}, {
  saveUnknown: true, 
  timestamps: false
});

// Define the model for cached responses
const CachedResponse = dynamoose.model('CachedResponse', CachedResponseSchema, {
  expires: {
    ttl: 0, 
    attribute: "ttl" 
  }
});

export const fetchExternalUsers = async () => {
  try {
    // Try to get cached data
    const cached = await CachedResponse.get('external-users');
    
    if (cached && cached.ttl > Math.floor(Date.now() / 1000)) {
      logger.info("Returning cached data...");
      return cached.data;
    }
  } catch (error) {
    logger.info("No valid cache found, fetching fresh data");
  }

  // Fetch external API data
  const { data } = await axios.get(EXTERNAL_API_URL);
  
  // Save the data to DynamoDB with automatic TTL
  await new CachedResponse({
    id: 'external-users',
    data: data,
  }).save();
  
  return data;
};