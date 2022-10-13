// TC-Status-Process.js

function FeaturesDependingOnPuzzleSolved()
{
    document.getElementById("Dropdown_More_ShowAnswer").disabled = g_bPuzzleSolved;
    document.getElementById("Dropdown_More_ShowSquare").disabled = g_bPuzzleSolved;    
    document.getElementById("Dropdown_More_SolveAnswers").disabled = g_bPuzzleSolved;    
    document.getElementById("Dropdown_More_SolveGrid").disabled = g_bGridSolved;    
    document.getElementById("Dropdown_More_SolvePuzzle").disabled = g_bPuzzleSolved;    
    document.getElementById("Dropdown_More_CheckAnswer").disabled = g_bPuzzleSolved;    
    document.getElementById("Dropdown_More_CheckSquare").disabled = g_bPuzzleSolved;    
    document.getElementById("Dropdown_More_CheckPuzzle").disabled = g_bPuzzleSolved;
    var sClass_GridSolved = 'Dropdown_More_Button';
    if ( g_bGridSolved )
        sClass_GridSolved = 'Dropdown_More_Button_Disabled'    
    var sClass_AnswersSolved = 'Dropdown_More_Button';
    if ( g_bAnswersSolved )
        sClass_AnswersSolved = 'Dropdown_More_Button_Disabled'    
    var sClass_PuzzleSolved = 'Dropdown_More_Button';
    if ( g_bPuzzleSolved )
        sClass_PuzzleSolved = 'Dropdown_More_Button_Disabled'    
    document.getElementById("Dropdown_More_ShowAnswer").className = sClass_PuzzleSolved;
    document.getElementById("Dropdown_More_ShowSquare").className = sClass_PuzzleSolved;
    document.getElementById("Dropdown_More_SolveAnswers").className = sClass_AnswersSolved;
    document.getElementById("Dropdown_More_SolveGrid").className = sClass_GridSolved;
    document.getElementById("Dropdown_More_SolvePuzzle").className = sClass_PuzzleSolved;
    document.getElementById("Dropdown_More_CheckAnswer").className = sClass_PuzzleSolved;
    document.getElementById("Dropdown_More_CheckSquare").className = sClass_PuzzleSolved;
    document.getElementById("Dropdown_More_CheckPuzzle").className = sClass_PuzzleSolved;
//
    var sClassName = 'Place_Button';
    if ( g_bGridSolved )
        sClassName = 'Place_Buttion_Disabled';
    for ( iRow = 0; iRow < g_aAnswers.length; iRow++ )
    {
        var sId = 'Place_' + iRow;
        document.getElementById(sId).disabled = g_bGridSolved;
        document.getElementById(sId).className = sClassName;
    }
}

function Status_Check()
{ // called everytime character is done, show answer(CA or GR), solve(CA, GR, All)
// CA
    var iCA_Correct = 0;
    var iCARows = g_aAnswers.length
    for ( var iRow = 0; iRow < iCARows; iRow++)  
    {
        if ( g_aAnswers[iRow] == g_aAnswersPlayer[iRow])
            iCA_Correct++
    }
    var sCA = 'Not Active'
    if ( g_bSettings_CA_Display_ShowProgress )
    {
        var sCA = 'Clues: ' + iCA_Correct + ' of ' + iCARows;
    }
    document.getElementById("Status_CA").innerHTML = sCA;
// GR
    var iGR_Correct = 0;
    var iGRRows = g_iGridWidth;
    for ( var iGRRow = 0; iGRRow < iGRRows; iGRRow++ )
    {
        if ( g_aGridAnswersPlayer[iGRRow] == g_aGridAnswers[iGRRow] )
            iGR_Correct++;
    }
    var iGRLetters = g_iGridHeight
// down grid answers - dont need to check for black squares cause player answer will have the .
    for (var iGRLetter = 0; iGRLetter < iGRLetters; iGRLetter++ )
    {
        var bLetterCorrect = true;
        for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
        {
            if ( GRB_ForRowLetter_GetAnswer(iRow, iGRLetter) != GRB_ForRowLetter_GetAnswerPlayer(iRow, iGRLetter) )
                bLetterCorrect = false;
        }
        if ( bLetterCorrect )
            iGR_Correct++
    }
    var iTot = g_iGridWidth+g_iGridHeight;
    var sGR = 'Not Active'
    if ( g_bSettings_CA_Display_ShowProgress )
    {
        sGR = 'Grid: ' + iGR_Correct + ' of ' + iTot;
    }
    document.getElementById("Status_GR").innerHTML = sGR;
    if ( g_bPuzzleSolved )
        return; // nothing to do here
    if ( iGR_Correct == iTot )
        g_bGridSolved = true;
    if ( iCA_Correct == iCARows)
        g_bAnswersSolved = true;
    g_bPuzzleSolved = g_bAnswersSolved && g_bGridSolved;        
    if ( g_bPuzzleSolved && g_bSettings_CAGR_Display_Complete )
        SuccessWindowPopup_Toggle(true);
    FeaturesDependingOnPuzzleSolved();
}
