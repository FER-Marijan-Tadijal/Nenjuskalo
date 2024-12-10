//

async function getItem(itemId: string) {
    try {
        const response = await fetch(`/api/item/${itemId}`);
        const itemData = await response.json();
        return itemData;
    } catch (err) {
        console.log("Error: ", err);
    }
}

const data = getItem("1");
export default data;
