"use client";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

export type Page = {
  url: string;
  title: string;
};

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ mr: 2 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography variant="h6" sx={{ color: "white" }}>
                MEAT CLUB
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
