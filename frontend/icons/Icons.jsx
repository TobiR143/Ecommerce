import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";

export const UserProfileIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#dcecf9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  );
};

export const CaretUpIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#1c2730"
      stroke="#1c2730"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 14l-6 -6l-6 6h12" />
    </svg>
  );
};

export const CaretDownIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#1c2730"
      stroke="#1c2730"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 10l6 6l6 -6h-12" />
    </svg>
  );
};

export const ShoppingCart = ({ quantity }) => {
  return (
    <IconButton aria-label="carrito">
      <Badge
        badgeContent={quantity}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#283843",
            color: "#dcecf9",
            fontSize: "0.7rem",
          },
        }}
      >
        <ShoppingCartIcon sx={{ color: "#dcecf9" }} />
      </Badge>
    </IconButton>
  );
};
