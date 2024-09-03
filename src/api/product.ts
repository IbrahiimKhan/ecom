import {axiosInstance} from '../utils/axios';

export const getProducts = async (endpoint = '') => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data?.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
