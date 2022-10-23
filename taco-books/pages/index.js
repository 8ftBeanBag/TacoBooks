import React, { Component } from 'react'
import Header from '../components/header.js';
import { ThemeProvider } from "@mui/material";
import { appTheme } from "../theme";

export default class extends Component {
  render () {
    return (
      <ThemeProvider theme={appTheme}>
        <Header />
      </ThemeProvider>
    )
  }
}
