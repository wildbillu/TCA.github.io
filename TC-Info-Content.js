// TC-Info-Content.js
//class="Info_Center Info_BackgroundColor"
function Make_Info_Content()
{
    var sInfoContent = '';
    sInfoContent += '<DIV class=Info_DivBorder_Image>'
    sInfoContent += '<div align=right><TABLE><TR><TD>Info</TD><TD><BUTTON class="Button_Info_CloseBox Id="Info_CloseBox" onclick="Button_Info_Click();">Close</TD></TR></TABLE></div>';
    sInfoContent += '<DIV class="Info_Center"><text Id="Info_Content_AuthorCredit" class="Info_Content_Credits Info_Content_Credits_Author">Puzzle By: Sketchi Bill - Image By: Sketchi Bill</text></DIV>';
    sInfoContent += '<DIV class="Info_Center"><text Id="Info_Content_PuzzleDate" class="Info_Content_Credits Info_Content_Credits_Date">September 27, 2022</text></DIV>';
    sInfoContent += '<DIV class="Info_Left"><text Id="Info_Content_PuzzleVersion" class="Info_Content_Credits Info_Content_Credits_Version">October 10, 2022</text></DIV>';
    sInfoContent += '</DIV>';
    return sInfoContent;
}
function Make_Info_Content_Update()
{
    document.getElementById("Info_Content_AuthorCredit").innerHTML = g_sPuzzleCreditAuthor;
    document.getElementById("Info_Content_PuzzleDate").innerHTML = g_sPuzzleCreditDate;
    document.getElementById("Info_Content_PuzzleVersion").innerHTML = g_sPuzzleVersion;
}



