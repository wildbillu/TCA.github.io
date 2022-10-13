// TC-GRB-Setup.js

function GRB_MakeGridAsButtons()
{
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        GRB_MakeGridRowAsButtons(iRow);
    }
}

function GRB_MakeGridRowAsButtons(iRow)
{
    var sInnerRowHTML = '';
    for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
    {
        sFunctionsToCall = '';
        sFunctionsToCall += ' onMouseDown="return GRB_onmousedown(' + iRow + ',' + iLetter + ');"'
        sFunctionsToCall += ' onkeypress="return GRB_onkeypress(event);"';
        sFunctionsToCall += ' onkeyup="return GRB_onkeydown(event.key,' + iRow + ',' + iLetter + ');"';
        sFunctionsToCall += ' onfocus="GRB_onfocus(this);"';
        sInnerRowHTML += '<BUTTON '
        sInnerRowHTML += GRB_MakeHTMLId(iRow, iLetter);
        sInnerRowHTML += ' class="GRB_Base" ';
        sInnerRowHTML += sFunctionsToCall;
        sInnerRowHTML += '>';
    }
    var sDiv = 'GRB_Div' + iRow;
    document.getElementById(sDiv).innerHTML=sInnerRowHTML;
//
    for ( var iLL = 0; iLL < g_iGridWidth; iLL++ )
    {
        GRB_ForRowLetter_SetButton(iRow, iLL, g_TC_cCodeMeaning_Inactive)
    }
}
