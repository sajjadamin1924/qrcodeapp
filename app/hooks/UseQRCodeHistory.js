// app/hooks/useQRCodeHistory.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export const useQRCodeHistory = () => {
  const saveCreateToHistory = async (data, type = "create") => {
    try {
      const saved = await AsyncStorage.getItem("qrHistory");
      const history = saved ? JSON.parse(saved) : [];

      const newItem = {
        id: uuid.v4().toString(),
        url: data,
        date: new Date().toLocaleString(),
        type,
      };

      const updated = [newItem, ...history];
      await AsyncStorage.setItem("qrHistory", JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving QR:", error);
    }
  };

  return { saveCreateToHistory };
};
