import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../config"

export const createSite = createAsyncThunk(
  "site/create",
  async (
    { siteName, siteCode, address, logo, companyId, finishDate },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post(`${server}/site`, {
        siteName,
        siteCode,
        address,
        logo,
        companyId,
        finishDate,
      });
      return data.site;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSites = createAsyncThunk(
  "site/getAll",
  async (companyId, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/site/gets`, { companyId });
      return data.sites;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSite = createAsyncThunk(
  'site/get',
  async (siteId, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/site/${siteId}`);
      return data.site;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteSite = createAsyncThunk(
  'site/delete',
  async (siteId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${server}/site/${siteId}`);
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);