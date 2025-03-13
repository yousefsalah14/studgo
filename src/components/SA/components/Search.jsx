import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Search({ placeholder = "Search…", onChange, value }) {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        sx={{
          flexGrow: 1,
          color: "white",
          borderRadius: "9999px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            borderRadius: "9999px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ color: "white" }} fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}
