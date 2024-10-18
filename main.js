function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('nav-active');
}

async function fetchDroneData() {
    // แสดงหน้าโหลด
    document.getElementById('loading').style.display = 'flex';

    try {
        // ดึงข้อมูลจาก Google Script URL ที่ให้มา
        const response = await fetch('https://script.google.com/macros/s/AKfycbzwclqJRodyVjzYyY-NTQDb9cWG6Hoc5vGAABVtr5-jPA_ET_2IasrAJK4aeo5XoONiaA/exec');
        const data = await response.json();
        
        console.log(data); // ตรวจสอบข้อมูลทั้งหมดที่ได้รับ

        if (Array.isArray(data.data)) {
            // กรองข้อมูลเพื่อให้แสดงเฉพาะ drone_id ที่ต้องการ
            const filteredDrones = data.data.filter(drone => drone.drone_id === 65011216);
            console.log(filteredDrones); // ตรวจสอบข้อมูลที่กรองแล้ว
            
            // แสดงข้อมูลถ้ามี
            if (filteredDrones.length > 0) {
                displayDroneData(filteredDrones);
            } else {
                console.log('No drones found with the specified ID.');
                displayNoDataMessage();
            }
        } else {
            console.error('Data is not an array:', data.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        // ซ่อนหน้าโหลดเมื่อเสร็จสิ้น
        document.getElementById('loading').style.display = 'none';
    }
}

function displayDroneData(droneItems) {
    const tableBody = document.getElementById('drone-table').querySelector('tbody');
    tableBody.innerHTML = ''; // เคลียร์ข้อมูลที่มีอยู่

    droneItems.forEach(drone => {
        // ตรวจสอบค่า max_speed
        let maxSpeedDisplay;
        if (drone.max_speed === null || typeof drone.max_speed === 'undefined') {
            maxSpeedDisplay = 100; // ถ้าไม่มี max_speed ให้แสดง 100
        } else if (drone.max_speed > 110) {
            maxSpeedDisplay = 110; // ถ้า max_speed > 110 ให้แสดง 110
        } else {
            maxSpeedDisplay = drone.max_speed; // แสดงค่า max_speed ปกติ
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${drone.drone_id || 'N/A'}</td>
            <td>${drone.drone_name || 'N/A'}</td>
            <td>${drone.light || 'N/A'}</td> 
            <td>${maxSpeedDisplay}</td> <!-- ใช้ maxSpeedDisplay ที่ปรับปรุงแล้ว -->
            <td>${drone.country || 'N/A'}</td>
            <td>${drone.population || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });
}


function displayNoDataMessage() {
    const tableBody = document.getElementById('drone-table').querySelector('tbody');
    tableBody.innerHTML = '<tr><td colspan="6">No data available for this drone ID.</td></tr>';
}

// Fetch and display data when the page loads
window.onload = fetchDroneData;
