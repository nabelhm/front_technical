import { useEffect, useState } from "react";
import { propertyApi } from "../api/propertyApi";

export const useProperties = (page = 1, filters = {}) => {
  const [state, setState] = useState({
    data: null,
    total: 0,
    page: 1,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getProperties();
  }, [page, JSON.stringify(filters)]);

  const getProperties = async () => {
    setState(current => ({
      ...current,
      isLoading: true,
      hasError: false,
      error: null,
    }));

    try {
      const response = await propertyApi.getProperties({ page, filters });
      setState({
        data: response.data,
        total: response.total,
        page: response.page,
        isLoading: false,
        hasError: false,
        error: null,
      });
      
    } catch (error) {
      setState({
        data: null,
        total: 0,
        page: page,
        isLoading: false,
        hasError: true,
        error: error.message || 'Error al cargar las propiedades',
      });
    }
  };

  return {
    properties: state.data,
    total: state.total,
    currentPage: state.page,
    isLoading: state.isLoading,
    hasError: state.hasError,
    error: state.error,
  };
};

export const useProperty = (id) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    if (id) getProperty();
  }, [id]);

  const getProperty = async () => {
    setState(current => ({
      ...current,
      isLoading: true,
      hasError: false,
      error: null,
    }));

    try {
      const property = await propertyApi.getProperty(id);
      setState({
        data: property,
        isLoading: false,
        hasError: false,
        error: null,
      });
      
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: error.message || 'Error al cargar la propiedad',
      });
    }
  };

  return {
    property: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    error: state.error,
  };
};

export const useLocations = () => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    setState(current => ({
      ...current,
      isLoading: true,
      hasError: false,
      error: null,
    }));

    try {
      const locations = await propertyApi.getLocations();
      setState({
        data: locations,
        isLoading: false,
        hasError: false,
        error: null,
      });
      
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: error.message || 'Error al cargar las ubicaciones',
      });
    }
  };

  return {
    locations: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    error: state.error,
  };
};