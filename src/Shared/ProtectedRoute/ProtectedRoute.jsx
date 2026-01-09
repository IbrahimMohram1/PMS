import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
// عدلي المسار حسب مكان الملف

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;

  if (!user) {
    // لو المستخدم مش مسجل دخول، نعيد توجيهه لصفحة تسجيل الدخول
    return <Navigate to="/login" replace />;
  }

  // لو مسجل دخول، نعرض المحتوى المحمي
  return children;
}
