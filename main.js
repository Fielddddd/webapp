function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('nav-active');
}

async function fetchDroneData() {
    // แสดงหน้าโหลด
    document.getElementById('loading').style.display = 'flex';

    try {
        const response = await fetch('https://server-api-vert.vercel.app/configs/65011216');

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log('Received data:', data); // แสดงข้อมูลที่ได้รับทั้งหมด

        // ตรวจสอบว่า data เป็น array
        if (Array.isArray(data)) {
            if (data.length === 0) {
                console.error('Received an empty array');
                displayNoDataMessage(); // แสดงข้อความหากไม่มีข้อมูล
            } else {
                displayDroneData(data); // แสดงข้อมูลทั้งหมด
            }
        } else {
            console.error('Data is not an array:', data);
            displayNoDataMessage(); // แสดงข้อความหากไม่มีข้อมูล
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        displayNoDataMessage(); // แสดงข้อความหากเกิดข้อผิดพลาด
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}


function displayDroneData(droneItems) {
    const tableBody = document.getElementById('drone-table').querySelector('tbody');
    tableBody.innerHTML = ''; // เคลียร์ข้อมูลที่มีอยู่

    droneItems.forEach(drone => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${drone.drone_id || 'N/A'}</td>
            <td>${drone.drone_name || 'N/A'}</td>
            <td>${drone.light || 'N/A'}</td> 
            <td>${drone.max_speed || 'N/A'}</td> <!-- แสดงค่า max_speed ตามที่ได้รับจากเซิร์ฟเวอร์ -->
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

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้า
window.onload = fetchDroneData;
