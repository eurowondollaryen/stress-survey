//for menu b02
let global_question_list;
let global_selected_question_list = [];
let global_changed_question_list = [];//수정된 항목 리스트

/*
* whiteSpace: normal: 
*/
const arrColumnsB02 = [
    {
        header: "질의순번",
        name: "qstn_seq",
        whiteSpace: 'normal',
        align: "right",
        width: 90,
        editor: "text"
    },
    {
      header: "설문제목",
      name: "srvy_titl",
      whiteSpace: 'normal',
      align: "left",
      width: 120
    },
    {
      header: "질의구분",
      name: "dtl_note",
      whiteSpace: 'normal',
      align: "left",
      width: 200,
      editor: "text"
    },
    {
      header: "질의제목",
      name: "qstn_titl",
      whiteSpace: 'pre',
      align: "left",
      width: 200,
      editor: "text"
    },
    {
      header: "가중치(전혀 그렇지 않다)",
      name: "qstn_optn_1",
      whiteSpace: 'normal',
      align: "center",
      editor: "text"
    },
    {
      header: "가중치(약간 그렇지 않다)",
      name: "qstn_optn_2",
      whiteSpace: 'normal',
      align: "center",
      editor: "text"
    },
    {
      header: "가중치(약간 그렇다)",
      name: "qstn_optn_3",
      whiteSpace: 'normal',
      align: "center",
      editor: "text"
    },
    {
      header: "가중치(매우 그렇다)",
      name: "qstn_optn_4",
      whiteSpace: 'normal',
      align: "center",
      editor: "text"
    },
    {
      header: "수정시간",
      name: "updt_time",
      whiteSpace: 'normal',
      width: 150,
      align: "center"
    },
  ];
/****************************************************************************************************
 * QUESTION FUNCTIONS(B02)
 *****************************************************************************************************/
 const searchQuestion = function () {
    $.ajax({
      type: "GET",
      url: "/searchQuestion",
      data: {
        srvy_id: $("#sel-srvy-id").val() /* 설문 ID */,
      },
      success: function (data) {
        console.log("질의 목록 조회 완료!");
        global_question_list = data;
        global_changed_question_list = [];
        //console.log(global_question_list);
  
        if (data.length < 1) {
          $("#grid-question-list").html("조회 결과가 없습니다.");
        } else {
          $("#grid-question-list").html("");

          const grid = new tui.Grid({
            rowHeaders: [
              /*
              {
                type: "rowNum",
                width: 100,
                align: "left",
                valign: "bottom",
              },*/
              {
                type: "checkbox",
              },
            ],
            el: document.getElementById("grid-question-list"),
            data: data,
            scrollX: true,
            scrollY: true,
            valign: "middle",
            columns: arrColumnsB02,
            bodyHeight: 500 /* grid 높이고정, 스크롤 생성 */
          });
          grid.on("check", (e) => {
            global_selected_question_list.push(
              global_question_list[e.rowKey]["qstn_seq"]
            );
            console.log(global_selected_question_list);
          });
          grid.on("uncheck", (e) => {
            for (let i = 0; i < global_selected_question_list.length; ++i) {
              if (
                global_selected_question_list[i] ===
                global_question_list[e.rowKey]["qstn_seq"]
              ) {
                global_selected_question_list.splice(i, 1);
              }
            }
            console.log(global_selected_question_list);
          });
          grid.on("afterChange", (e) => {
            //TODO: Header sort을 한 뒤에도 global array가 정확하게 수정될까?
            for(let i = 0; i < e.changes.length; ++i) {
                //1. 수정한 row의 원본을 복사
                let currentQuestion = Object.assign({}, global_question_list[e.changes[i]["rowKey"]]);
                //2. 복사한 row에서 수정된 값 수정
                currentQuestion[e.changes[i]["columnName"]] = e.changes[i]["value"];
                //3. 수정된 row를 별도 저장
                global_changed_question_list.push(currentQuestion);
                /*
                console.log(e.changes[i]["columnName"]);
                console.log(e.changes[i]["prevValue"]);
                console.log(e.changes[i]["rowKey"]);
                console.log(e.changes[i]["value"]);
                */
            }
          });
        }
        global_selected_question_list = [];
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("request failed.\n" + xhr.status + " " + xhr.statusText);
      },
    });
  };
  
  const addQuestion = function () {
    //조회 전 입력값 체크
    const QSTN_TITL = $("#inpQSTN_TITL").val();
    const QSTN_OPTN_1 = $("#inpQSTN_OPTN_1").val();
    const QSTN_OPTN_2 = $("#inpQSTN_OPTN_2").val();
    const QSTN_OPTN_3 = $("#inpQSTN_OPTN_3").val();
    const QSTN_OPTN_4 = $("#inpQSTN_OPTN_4").val();
    const DTL_NOTE = $("#inpDTL_NOTE_B02").val();
  
    if (comNullCheck(QSTN_TITL)) {
      comMessage("NULLCHECK", "질의제목");
      $("#inpQSTN_TITL").focus();
      return;
    }
  
    if (comNullCheck(QSTN_OPTN_1)) {
      comMessage("NULLCHECK", "가중치(전혀 그렇지 않다)");
      $("#inpQSTN_OPTN_1").focus();
      return;
    }
  
    if (comNullCheck(QSTN_OPTN_2)) {
      comMessage("NULLCHECK", "가중치(약간 그렇지 않다)");
      $("#inpQSTN_OPTN_2").focus();
      return;
    }
  
    if (comNullCheck(QSTN_OPTN_3)) {
      comMessage("NULLCHECK", "가중치(약간 그렇다)");
      $("#inpQSTN_OPTN_3").focus();
      return;
    }
  
    if (comNullCheck(QSTN_OPTN_4)) {
      comMessage("NULLCHECK", "가중치(매우 그렇다)");
      $("#inpQSTN_OPTN_4").focus();
      return;
    }
  
    if (comNullCheck(DTL_NOTE)) {
      comMessage("NULLCHECK", "비고");
      $("#inpDTL_NOTE_B02").focus();
      return;
    }
  
    $.ajax({
      type: "POST",
      url: "/addQuestion",
      data: {
        SRVY_ID: $("#sel-srvy-id").val(),
        QSTN_TITL: QSTN_TITL,
        QSTN_OPTN_1: QSTN_OPTN_1,
        QSTN_OPTN_2: QSTN_OPTN_2,
        QSTN_OPTN_3: QSTN_OPTN_3,
        QSTN_OPTN_4: QSTN_OPTN_4,
        DTL_NOTE: DTL_NOTE,
      },
      success: function (data) {
        alert("설문에 질의가 추가되었습니다.");
        console.log(data);
        $("#btn-add-question-modal-close").click();
        searchQuestion();
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("request failed.\n" + xhr.status + " " + xhr.statusText);
      },
    });
  };
  
  const deleteQuestion = function () {
    if (global_selected_question_list.length < 1) {
      alert("선택한 질의가 없습니다.");
      return;
    }
    $.ajax({
      type: "DELETE",
      url: "/deleteQuestion",
      data: {
        SRVY_ID: $("#sel-srvy-id").val(),
        question_list: global_selected_question_list,
      },
      success: function (data) {
        alert("질의가 삭제되었습니다.");
        console.log(data);
        searchQuestion();
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("request failed.\n" + xhr.status + " " + xhr.statusText);
      },
    });
  };

  const saveQuestion = function () {
    if (global_changed_question_list.length < 1) {
      alert("수정된 질의가 없습니다.");
      return;
    }
    $.ajax({
      type: "POST",
      url: "/saveQuestion",
      data: {
        question_list: global_changed_question_list
      },
      success: function (data) {
        alert("수정 내용이 저장되었습니다.");
        console.log(data);
        searchQuestion();
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("request failed.\n" + xhr.status + " " + xhr.statusText);
      },
    });
  };

  //todo: implement this
  const addQuestionRow = function () {
    //global_question_list.push();
    //global_changed_question_list.push();
  };
  
  //clear survey modal inputs
  const clearQuestionInput = function () {
    $("#inpQSTN_TITL").val("");
    $("#inpQSTN_OPTN_1").val("");
    $("#inpQSTN_OPTN_2").val("");
    $("#inpQSTN_OPTN_3").val("");
    $("#inpQSTN_OPTN_4").val("");
    $("#inpDTL_NOTE_B02").val("");
  };