

export function defaultImg (category) {
    const fashionImg = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const foodImg = "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const travelImg = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=821&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    if (category === "fashion") {
        return fashionImg;
    }

    if (category === "Food") {
        return foodImg;
    }

    return travelImg;
}