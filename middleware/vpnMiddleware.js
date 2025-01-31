require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ipinfo = require("ipinfo");  // ipinfo.io API for IP geolocation

// Middleware to detect VPN usage
const vpnMiddleware = async (req, res, next) => {
  try {
    // Get user IP (handles behind proxies or load balancers)
    const userIP = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    if (!userIP) {
      return res.status(400).json({ message: "Could not determine user IP" });
    }

    console.log("User IP:", userIP); // Debugging: log the user IP

    // Fetch IP details from ipinfo.io API (replace with your own IPinfo API key)
    ipinfo(userIP, { token: process.env.IPINFO_API_KEY }, (err, response) => {
      if (err) {
        console.error("Error fetching IP details:", err);
        return res.status(500).json({ message: "Error fetching IP details." });
      }

      // Check if the IP is a VPN/proxy (you can customize this check based on response data)
      if (response.bogon) {  // 'bogon' refers to suspicious or VPN-related IP addresses
        return res.status(403).json({ message: "VPN/Proxy usage is not allowed!" });
      }

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error("VPN Detection Error:", error.message);
    return res.status(500).json({ message: "Error verifying VPN usage" });
  }
};

module.exports = vpnMiddleware;
