import Avatar from "@mui/material/Avatar"
import Box from '@mui/material/Box'

const CustomOption = ({ onClick, ...props }) => (
    <Box
        {...props}
    >
        <Avatar
            src={props.option.imagen}
            alt={props.option.label}
            sx={{ marginRight: 2, cursor: 'pointer' }}
        />
        {props.option.label}
    </Box>
)

export default CustomOption