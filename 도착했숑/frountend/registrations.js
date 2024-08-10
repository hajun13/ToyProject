document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/users/registrations")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("registrations-table").getElementsByTagName("tbody")[0];
            data.forEach(registration => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${registration.id}</td>
                    <td><input type="text" value="${registration.student_name}" data-id="${registration.id}" data-field="student_name" /></td>
                    <td><input type="date" value="${registration.birthdate}" data-id="${registration.id}" data-field="birthdate" /></td>
                    <td><input type="text" value="${registration.grade_or_position}" data-id="${registration.id}" data-field="grade_or_position" /></td>
                    <td><input type="text" value="${registration.church}" data-id="${registration.id}" data-field="church" /></td>
                    <td><input type="text" value="${registration.phone}" data-id="${registration.id}" data-field="phone" /></td>
                    <td>${new Date(registration.registered_at).toLocaleString()}</td>
                    <td><input type="checkbox" ${registration.is_checked_in ? "checked" : ""} data-id="${registration.id}" /></td>
                `;
                tableBody.appendChild(row);
            });

            // 체크박스 변경 이벤트
            document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
                checkbox.addEventListener("change", function () {
                    const registrationId = this.getAttribute("data-id");
                    const isCheckedIn = this.checked;

                    fetch(`http://localhost:8080/users/registrations/${registrationId}/checkin`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ is_checked_in: isCheckedIn })
                    }).then(response => {
                        if (!response.ok) {
                            alert("체크인 상태 업데이트 중 오류가 발생했습니다.");
                        }
                    });
                });
            });

            // 입력 필드 변경 이벤트
            document.querySelectorAll("input[type='text'], input[type='date']").forEach(input => {
                input.addEventListener("change", function () {
                    const registrationId = this.getAttribute("data-id");
                    const field = this.getAttribute("data-field");
                    const value = this.value;

                    fetch(`http://localhost:8080/users/registrations/${registrationId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ [field]: value })
                    }).then(response => {
                        if (!response.ok) {
                            alert("등록 정보 수정 중 오류가 발생했습니다.");
                        }
                    });
                });
            });
        })
        .catch(error => {
            console.error("Error fetching registrations:", error);
        });
});
