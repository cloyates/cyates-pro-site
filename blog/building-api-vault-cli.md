# Building api_vault: Encrypted CLI for API Key Management

Managing API keys securely is a nightmare. Storing them in files, environment variables, or worse—hardcoding them—creates security risks. So I built api_vault, an encrypted CLI tool for secure API key storage.

## The Problem

Every developer faces this: where do you safely store API keys? Traditional solutions are either insecure or overly complex for small projects.

## The Solution

A simple CLI that encrypts API keys locally using AES-256 encryption. No cloud dependencies, no complex setup—just secure local storage.

## Key Features

- AES-256 encryption with master password
- Simple add/get/list commands
- No network dependencies
- Cross-platform compatibility

## How AI Helped

I described the problem to ChatGPT and Replit Agent. They handled the encryption logic, CLI argument parsing, and file operations while I focused on the user experience and security requirements.

*Published: January 2025*