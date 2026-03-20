# Real Holat — Civic Infrastructure Monitoring Platform

**Real Holat** is a citizen platform for monitoring the fulfillment of government promises on infrastructure improvements, focusing on schools. Users can quickly submit reports with photos, and all data is displayed on a public dashboard in real time.

## Problem
The government invests in projects (school renovations, equipment, sanitary improvements), but there is no transparent way to verify completion. Citizen feedback often gets lost in bureaucracy and is not publicly visible.

**Example:** Soap dispensers promised in school toilets remain empty or broken, and there’s no simple way to report it officially.

## Solution
- Users can select a school, check promised improvements, and upload photos with comments.  
- Reports are instantly published on a public dashboard.  
- Promotes transparency, accountability, and public awareness.

**Key Features:**  
- Map of schools with promises and photos (Leaflet.js)  
- Citizen reports with photo and status (✔ Completed / ✖ Problem)  
- Public dashboard with aggregated statistics  

## Architecture & Stack
- **Backend:** Python + FastAPI  
- **Frontend:** React  
- **Database:** PostgreSQL  
- **Map:** Leaflet.js  

**Project Structure:**  
backend/ — FastAPI, models, services, API endpoints
frontend/ — React, pages, components, map
database/ — PostgreSQL schema

Main database entities: Schools, Promises, Reports, Report_photos  

**Example API Endpoints:**  
- `GET /schools/` — get list of schools  
- `POST /reports/` — create a new report  
- `GET /dashboard/stats` — get aggregated statistics  

## Running the Project
**Backend**  
```bash
make backend
```
Backend available at: http://localhost:8000

**Frontend**
```bash
make frontend
```
Frontend available at: http://localhost:3000