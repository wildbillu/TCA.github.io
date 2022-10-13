// TC-CAB-Setup.js
//
function CAB_LoadClueAnswerSection()
{
    var s01 = CAB_Clues1And2Entries_MakeInnerHTML();
    document.getElementById('CA_01').innerHTML = s01;
    var iLastRow = g_aClues.length;
    for ( iX = 2; iX < iLastRow; iX++ )
        CAB_SetRow(iX);
    for ( var iR = 0; iR < iLastRow; iR++ )
        CAB_SetRowToInActive(iR)
}

function CAB_MakeButtonsForAnswer(iRow)
{
    var sInnerHTML = '';
    sInnerHTML += '<DIV>';
    var iLength = g_aAnswers[iRow].length;
    for ( var iLetter = 0; iLetter < iLength; iLetter++ )
    {
        sInnerHTML += CAB_MakeButtonSingleHTML(iRow, iLetter);
    }
    sInnerHTML += '</DIV>';
    return sInnerHTML;
}

function CAB_MakeButtonSingleHTML(iRow, iLetter)
{
    var sInnerRowHTML = '';
    var sFunctionsToCall = '';
//    sFunctionsToCall += ' onMouseDown="return CAB_onmousedown(' + iRow + ',' + iLetter + ');"'
    sFunctionsToCall += ' onkeypress="return CAB_onkeypress(event);"';
    sFunctionsToCall += ' onkeyup="return CAB_onkeydown(event.key,' + iRow + ',' + iLetter + ');"';
    sFunctionsToCall += ' onfocus="CAB_onfocus(this);"';
    sInnerRowHTML += '<BUTTON '
    sInnerRowHTML += CAB_MakeHTMLId(iRow, iLetter);
    sInnerRowHTML += ' class="CAB_Base" ';
    sInnerRowHTML += sFunctionsToCall;
    sInnerRowHTML += '>';
    return sInnerRowHTML;
}

function CAB_SetRow(iRow)
{
    var sClue = g_aClues[iRow];
    var sClueElement = 'CA_' + iRow + '_C'
    document.getElementById(sClueElement).innerHTML = sClue;
    var sInnerHTML = CAB_MakeButtonsForAnswer(iRow);
    var sAnswerElement = 'CA_' + iRow + '_A'
    document.getElementById(sAnswerElement).innerHTML = sInnerHTML;

    var sPlaceElement = 'CA_' + iRow + '_Place'
    var sPlaceInnerHTML = CA_PlaceButton_Setup(iRow);
    document.getElementById(sPlaceElement).innerHTML = sPlaceInnerHTML;
}

function CAB_Clues1And2Entries_MakeInnerHTML()
{
    var s = '';
		s+='<TABLE class="Row_DualClue">';
    	s+='<TR align=center><TD>' + CAB_TableForDualAnswer() + '</TD></TR>';
        s+='</TABLE>';
    return s;
}

function CAB_TableForDualAnswer()
{
    var sInnerHTML = '';
    sInnerHTML += '<TABLE cellspacing=0 padding=0><TR width=100%>';
    sInnerHTML += '<TD>' + CA_PlaceButton_Setup(0) + '</TD>';
    sInnerHTML += '<TD class="CAB_Clue_Text">' + g_sDualClueBefore + '</TD>';
    sInnerHTML += '<TD>' + CAB_MakeButtonsForAnswer(0) + '</TD>';
    sInnerHTML += '<TD class="CAB_Clue_Text">' + g_sDualClueMiddle + '</TD>';
    sInnerHTML += '<TD>' + CAB_MakeButtonsForAnswer(1) + '</TD>';
    sInnerHTML += '<TD class="CAB_Clue_Text">' + g_sDualClueEnd + '</TD>';
    sInnerHTML += '<TD>' + CA_PlaceButton_Setup(1) + '</TD>';
    sInnerHTML += '</TR></TABLE>';
    return sInnerHTML;
}




