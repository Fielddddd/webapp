document.getElementById('temperatureForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันไม่ให้ฟอร์มรีเฟรชหน้า

    const droneId = document.getElementById('droneId').value; // ดึงค่าจาก input สำหรับ drone_id
    const temperature = document.getElementById('temperature').value; // ดึงค่าจาก input สำหรับ celsius

    // สร้างวัตถุข้อมูลที่จะส่ง
    const data = {
        drone_id: droneId,
        celsius: temperature,
        country: "Thailand",
        drone_name: "Annisa Noivong"
    };

    // แสดงหน้าโหลด
    document.getElementById('loading').style.display = 'flex';

    // ส่งข้อมูลไปยัง API
    fetch('https://app-tracking.pockethost.io/api/collections/drone_logs/records', {
        method: 'POST', // ใช้ POST เพื่อส่งข้อมูล
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // แปลงวัตถุข้อมูลเป็น JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // แปลงการตอบกลับเป็น JSON
    })
    .then(data => {
        // แสดงกรอบข้อความสำเร็จ
        displaySuccessMessage('Temperature updated successfully!');

        // รีเฟรชหน้าใหม่หลังจาก 2 วินาที
        setTimeout(() => {
            location.reload();
        }, 2000); // รอ 2 วินาทีก่อนรีเฟรช
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error); // แสดงข้อผิดพลาดใน console
        alert(`Error: ${error.message}`); // แจ้งผู้ใช้เกี่ยวกับข้อผิดพลาด
    })
    .finally(() => {
        // ซ่อนหน้าโหลดเมื่อเสร็จสิ้น
        document.getElementById('loading').style.display = 'none';
    });
});

function displaySuccessMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    const messageBox = document.createElement('div');
    messageBox.innerText = message;
    messageBox.className = 'success-message';
    messageContainer.appendChild(messageBox);

    // ตั้งเวลาให้กรอบข้อความหายไปหลังจาก 3 วินาที
    setTimeout(() => {
        messageBox.remove();
    }, 3000); // รอ 3 วินาทีก่อนลบกรอบข้อความ
}

