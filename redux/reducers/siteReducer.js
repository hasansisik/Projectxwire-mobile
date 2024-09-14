import { createReducer } from "@reduxjs/toolkit";
import {
  createSite,
  getSite,
  getSites,
  deleteSite,
} from "../actions/siteActions";

export const siteReducer = createReducer(
  {
	sites: [],
	site: {},
	loading: false,
	error: null,
	message: null,
  },
  (builder) => {
	builder
    // Create Site
    .addCase(createSite.pending, (state) => {
      state.loading = true;
    })
    .addCase(createSite.fulfilled, (state, action) => {
      state.loading = false;
      state.site = action.payload;
    })
    .addCase(createSite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Get Sites
    .addCase(getSites.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSites.fulfilled, (state, action) => {
      state.loading = false;
      state.sites = action.payload;
    })
    .addCase(getSites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Get Site
    .addCase(getSite.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSite.fulfilled, (state, action) => {
      state.loading = false;
      state.site = action.payload;
    })
    .addCase(getSite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Delete Site
    .addCase(deleteSite.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteSite.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteSite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

	// Error and Message
	builder.addCase("clearError", (state) => {
	  state.error = null;
	});
	builder.addCase("clearMessage", (state) => {
	  state.message = null;
	});
  }
);