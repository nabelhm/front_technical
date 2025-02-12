import { mockProperties, mockLocations } from "./mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const propertyApi = {
  getProperties: async ({ page = 1, filters = {} }) => {
    await delay(400);

    let filtered = [...mockProperties];

    if (filters.priceRange) {
      filtered = filtered.filter(
        (p) =>
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    return {
      data: filtered.slice((page - 1) * 12, page * 12),
      total: filtered.length,
      page,
    };
  },

  getProperty: async (id) => {
    await delay(500);
    return mockProperties.find((p) => p.id === id);
  },

  getLocations: async () => {
    await delay(300);
    return mockLocations;
  },
};
