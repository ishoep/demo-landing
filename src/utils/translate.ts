export const translateText = async (text, targetLang) => {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ru|${targetLang}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.responseData.translatedText || text;
    } catch (error) {
      console.error("Ошибка перевода:", error);
      return text;
    }
  };
  
  