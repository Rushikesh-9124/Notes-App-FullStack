export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials = (name) => {
    if(!name) return null;
    const words = name.split(" ")
    let initials = ""
    for(const word of words){
        initials += word[0]
    }
    return initials.toUpperCase();
}

export const cardData = {
    title: "New Title",
    date: "21-05-2025",
    
    tags: ["Birthday", "BornDay"],
    isPinned: false,
}