import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  
  const user = JSON.parse(localStorage.getItem('user') )|| {
    avatar: '/static/images/avatars/avatar_6.png',
    city: '',
    country: '',
    name: 'Janette Doe',
    email:"jane@email.com"
  };
  
  export const AccountProfile = (props) => (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
            alt={user.name}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`${user.email}`}
          </Typography>
          {/* <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.timezone}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );