export default async function getSeller(sellerId: string) {
    try {
        const response = await fetch(`/api/users/${sellerId}`);
        const sellerData = await response.json();
        return sellerData;
    } catch (err) {
        console.log("Error: ", err);
    }
}
