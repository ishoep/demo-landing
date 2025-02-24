export const uploadImage = async (file: File): Promise<string | null> => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    
    if (!apiKey) {
      console.error("❌ Ошибка: VITE_IMGBB_API_KEY не задан!");
      return null;
    }
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      console.log("🔗 Отправка запроса на imgbb...");
      
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      
      if (data.success) {
        console.log("✅ Изображение загружено:", data.data.url);
        return data.data.url; // URL загруженного изображения
      } else {
        console.error("❌ Ошибка загрузки изображения:", data);
        return null;
      }
    } catch (error) {
      console.error("❌ Ошибка при отправке изображения:", error);
      return null;
    }
  };
  