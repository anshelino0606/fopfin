import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';
import UsersModal from './components/modals/UsersModal';
import CategoriesModal from './components/modals/CategoriesModal';
import DeleteDataModal from './components/modals/DeleteDataModal';
import LogoutModal from './components/modals/LogoutModal';
import {
  AuthPage,
  ExpensesPage,
  ExpensesStatisticPage,
  IncomePage,
  IncomeStatisticPage,
  SettingsPage,
  StatisticsMenuPage,
  StatisticsPage,
  TaxesStatisticPage,
} from "./pages";


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/statistics" element={<StatisticsPage />} >
            <Route index element={<StatisticsMenuPage/>}/>
            <Route path="expense-report" element={<ExpensesStatisticPage/>}/>
            <Route path="income-report" element={<IncomeStatisticPage/>}/>
            <Route path="tax-report" element={<TaxesStatisticPage/>}/>
          </Route>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/users" element={<UsersModal />} />
          <Route path="/settings/categories" element={<CategoriesModal />} />
          <Route path="/settings/delete-data" element={<DeleteDataModal />} />
          <Route path="/settings/logout" element={<LogoutModal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; 