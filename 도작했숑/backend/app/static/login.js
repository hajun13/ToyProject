$(function() {
  $("#register-button").click(function() {
      const studentName = $("#student-name").val().trim();
      const birthdate = $("#birthdate").val().trim();
      const gradeOrPosition = $("#grade-or-position").val();
      const church = $("#church").val().trim();
      const phone = $("#phone").val().trim();

      if (!studentName || !birthdate || !gradeOrPosition || !church || !phone) {
          alert("모든 목록을 작성해주세요.");
      } else if (/\s/.test(church)) {
          alert("출석교회 항목에는 띄어쓰기를 포함할 수 없습니다.");
      } else {
        $.ajax({
          url: 'http://localhost:8080/users/register',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
              student_name: studentName,
              birthdate: birthdate,
              grade_or_position: gradeOrPosition,
              church: church,
              phone: phone,
          }),
          success: function(response) {
              alert("등록 완료하였습니다");
          },
          error: function(xhr, status, error) {
              console.error("Error:", xhr, status, error);  // 오류 로그 출력
              alert("등록 중 오류가 발생했습니다");
          }
      });      
      }
  });
});
