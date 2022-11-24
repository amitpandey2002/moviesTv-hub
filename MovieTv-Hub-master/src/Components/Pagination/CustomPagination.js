import React from 'react';
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

 function CustomPagination(props) {
     const darkTheme=createMuiTheme({
         palette: {
             type:"dark",
         },
     });
     function handlePageChange(page)
     {
         props.setPage(page);
         window.scroll(0,0);
     }
     //pagination shows the page number to user and allows the user to select any page
    return (
        <div style={{
            width : "100%",
            display : "flex",
            justifyContent : "center",
            marginTop : "10px"
        }}>
            <ThemeProvider theme={darkTheme}>
                <Pagination
                 count={props.numOfPages} 
                onChange={(event) => handlePageChange(event.target.textContent)}
                // onClick={(prevPage) => { return handlePageChange(prevPage-1)}} 
                color="secondary"
                hideNextButton
                hidePrevButton
                />
            </ThemeProvider>
        </div>
    )
}
export default CustomPagination;
