document.addEventListener("DOMContentLoaded", async () => {
    const userDetail = document.getElementById("user-detail");
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    if (!userId) return;
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();

        // ตรวจสอบว่ามีข้อมูลที่อยู่หรือไม่
        const address = user.address 
            ? `${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
            : "ไม่พบข้อมูล";

        // ตรวจสอบว่ามีข้อมูลบริษัทหรือไม่
        const company = user.company 
            ? user.company.name
            : "ไม่พบข้อมูล";

        userDetail.innerHTML = `
            <h2>${user.name} (${user.username})</h2>
            <p><strong>อีเมล:</strong> ${user.email}</p>
            <p><strong>ชื่อเล่น:</strong> ${user.username}</p>
            <p><strong>เบอร์โทรศัพท์:</strong> ${user.phone}</p>
            <p><strong>เว็บไซต์:</strong> ${user.website}</p>
            <p><strong>ที่อยู่:</strong> ${address}</p>
            <p><strong>บริษัท:</strong> ${company}</p>
        `;
        
        document.getElementById("view-posts").addEventListener("click", () => {
            window.location.href = `user-posts.html?id=${userId}`;
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
});