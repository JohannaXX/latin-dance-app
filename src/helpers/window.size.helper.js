const getWindowDimensions = () => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    return {  windowWidth, windowHeight };
}

export const windowDimensions = () => {
    let windowDimensions = getWindowDimensions();

    const handleResize = () => {
        windowDimensions = getWindowDimensions();
        return () => window.removeEventListener('resize', handleResize);
    };

    window.addEventListener('resize', handleResize);
  
    return windowDimensions;
}

