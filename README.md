# [Turbo FPL](https://turbo-fpl.vercel.app/)

**Turbo FPL** is a simple and powerful website that utilizes the Fantasy Premier League (FPL) API to display detailed player and manager statistics. It also features a machine learning-powered **Predicted Points** section to help users make better decisions in FPL.  

## Features  

- **Player Stats:** Explore detailed stats for all Premier League players.  
- **Manager Stats:** View key information and performance data for FPL managers.
- **Price Changes:** Predicted price changes for players.
- **Predicted Points:** Get predictions for player points using a machine learning model trained on historical FPL data.  

## Technologies Used  

- **Frontend:** Next.js, React, TypeScript  
- **Backend/API:** FPL's free API  
- **Machine Learning:** RandomForestRegressor model trained on features like goals, assists, clean sheets and expected stats.  
- **Hosting:** Vercel  

## How It Works  

1. **Player and Manager Data:**  
   The site fetches real-time data from the FPL API and displays it in a user-friendly format.  

2. **Predicted Points Model:**  
   The machine learning model predicts player points based on input features such as:  
   - Minutes played  
   - Goals scored  
   - Assists  
   - Clean sheets  
   - Yellow cards  
   - Expected goals (xG)  
   - Expected assists (xA)  
   - Expected goals conceded (xGC)  
   
   The predictions are displayed in the **Predicted Points** section.  

## Getting Started  

### Prerequisites  

- Node.js (v18 or later)  
- Yarn or npm  

### Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/Jowwan/Turbo-FPL.git
   ```  

2. Navigate to the project directory:  
   ```bash  
   cd Turbo-FPL  
   ```  

3. Install dependencies:  
   ```bash  
   npm install  
   # or  
   yarn install  
   ```  

4. Start the development server:  
   ```bash  
   npm run dev  
   # or  
   yarn dev  
   ```  

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).  


Let me know if you'd like any further customization!
