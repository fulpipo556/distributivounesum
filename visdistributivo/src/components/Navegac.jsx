import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Typography, 
  Container,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Avatar,
  Badge,
  Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

// Education-focused icons
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScienceIcon from '@mui/icons-material/Science';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

function Navegac() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Enhanced university color palette
  const colors = {
    primary: "#0D5429", // Rich green for academic prestige
    secondary: "#DFF0D8", // Soft light green for contrast
    accent: "#C94B32", // Warm brick red for university tradition
    accentLight: "#F8E9E7", // Light warm background
    gold: "#E6C64C", // Accent gold for prestige elements
    cream: "#F9F7F1", // Cream for backgrounds
    darkText: "#2E3338" // Dark text for readability
  };

  const navItems = [
    { 
      text: "Inicio", 
      path: "/home", 
      icon: <DashboardIcon />, 
      color: colors.primary,
      tooltip: "Panel principal del sistema académico"
    },
    { 
      text: "Funciones Académicas", 
      path: "/distrif", 
      icon: <AccountBalanceIcon />, 
      color: colors.primary,
      tooltip: "Gestión de funciones académicas institucionales"
    },
    { 
      text: "Actividades Docentes", 
      path: "/act", 
      icon: <MenuBookIcon />, 
      color: colors.accent,
      tooltip: "Administración de actividades docentes"
    },
    { 
      text: "Períodos Académicos", 
      path: "/doc", 
      icon: <EventNoteIcon />, 
      color: colors.primary,
      tooltip: "Configuración de períodos lectivos"
    },
    { 
      text: "Gestión Docente", 
      path: "/doce", 
      icon: <AssignmentIndIcon />, 
      color: colors.primary,
      tooltip: "Administración del personal académico"
    },
    { 
      text: "Distributivo Académico", 
      path: "/distrib", 
      icon: <ClassIcon />, 
      color: colors.accent,
      tooltip: "Organización de asignaturas y cursos"
    },
    { 
      text: "Horas Complementarias", 
      path: "/he", 
      icon: <CastForEducationIcon />, 
      color: colors.primary,
      tooltip: "Gestión de horas de actividades complementarias"
    },
    { 
      text: "Plan de Trabajo", 
      path: "/plan", 
      icon: <ScienceIcon />, 
      color: colors.accent,
      tooltip: "Planificación de actividades académicas"
    },
    { 
      text: "Distribución de Carga", 
      path: "/", 
      icon: <LocalLibraryIcon />, 
      color: colors.primary,
      tooltip: "Asignación y distribución de carga horaria docente"
    }
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ width: 300, height: '100%', overflow: 'auto' }} role="presentation">
      <Box sx={{ 
        p: 3, 
        bgcolor: colors.primary, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'white',
              border: `3px solid ${colors.gold}`,
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
          >
            <SchoolIcon sx={{ fontSize: 40, color: colors.primary }} />
          </Avatar>
          <Badge 
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Avatar sx={{ width: 22, height: 22, bgcolor: colors.gold }}>
                <EmojiEventsIcon sx={{ fontSize: 14, color: colors.primary }} />
              </Avatar>
            }
          />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: 'white' }}>
            SISTEMA ACADÉMICO
          </Typography>
          <Typography variant="subtitle2" sx={{ color: colors.secondary, fontStyle: 'italic' }}>
            Distribución Académica Universitaria
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ bgcolor: colors.cream, height: '100%', pb: 4 }}>
        <List sx={{ pt: 2 }}>
          {navItems.map((item, index) => (
            <Box key={item.text}>
              <Tooltip title={item.tooltip} placement="right" arrow>
                <ListItem 
                  button 
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    py: 1.8,
                    borderLeft: index === 2 || index === 5 || index === 7 ? 
                      `4px solid ${colors.accent}` : 
                      `4px solid transparent`,
                    '&:hover': {
                      bgcolor: index % 2 === 0 ? colors.secondary : colors.accentLight,
                      borderLeft: `4px solid ${index % 2 === 0 ? colors.primary : colors.accent}`
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: item.color,
                    minWidth: 40 
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      color: colors.darkText
                    }}
                  />
                </ListItem>
              </Tooltip>
              {index < navItems.length - 1 && <Divider variant="middle" sx={{ my: 0.5 }} />}
            </Box>
          ))}
        </List>
        <Box sx={{ p: 3, mt: 2, bgcolor: colors.secondary, borderTop: `1px solid ${colors.primary}` }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: colors.primary, textAlign: 'center' }}>
            © {new Date().getFullYear()} Universidad Nacional
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: colors.darkText, mt: 0.5 }}>
            Sistema de Gestión Académica v2.5
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ 
        bgcolor: colors.primary, 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        borderBottom: `3px solid ${colors.gold}`
      }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ py: { xs: 1, md: 0.5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Avatar sx={{ 
                bgcolor: 'white', 
                mr: 2,
                border: `2px solid ${colors.gold}`,
                width: 40,
                height: 40
              }}>
                <SchoolIcon sx={{ color: colors.primary }} />
              </Avatar>
              <Box>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontWeight: 'bold',
                    display: { xs: 'none', sm: 'block' },
                    letterSpacing: 0.5
                  }}
                >
                  SISTEMA ACADÉMICO
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: { xs: 'none', sm: 'block' },
                    color: colors.secondary,
                    letterSpacing: 1
                  }}
                >
                  UNIVERSIDAD NACIONAL
                </Typography>
              </Box>
            </Box>

            {isMobile ? (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <Button 
                  variant="outlined"
                  onClick={() => handleNavigate("/")}
                  startIcon={<LocalLibraryIcon />}
                  sx={{
                    color: 'white',
                    borderColor: colors.gold,
                    mr: 1,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderColor: colors.gold
                    }
                  }}
                >
                  Distribución
                </Button>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={() => setDrawerOpen(true)}
                  sx={{ 
                    ml: 1,
                    border: `1px solid ${colors.secondary}`,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                flexWrap: 'wrap', 
                justifyContent: 'flex-end',
                ml: 'auto'
              }}>
                {navItems.map((item, index) => (
                  <Tooltip key={item.text} title={item.tooltip} arrow>
                    <Button
                      variant={index % 3 === 0 ? "contained" : "outlined"}
                      onClick={() => handleNavigate(item.path)}
                      startIcon={item.icon}
                      sx={{
                        bgcolor: index % 3 === 0 ? 
                          (index % 2 === 0 ? colors.accent : 'white') : 
                          'transparent',
                        color: index % 3 === 0 ? 
                          (index % 2 === 0 ? 'white' : colors.primary) : 
                          (index % 2 === 0 ? colors.accent : 'white'),
                        borderColor: index % 3 === 0 ? 
                          'transparent' : 
                          (index % 2 === 0 ? colors.accent : 'white'),
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 2,
                        fontSize: '0.85rem',
                        borderRadius: 1,
                        boxShadow: index % 3 === 0 ? 1 : 'none',
                        '&:hover': {
                          bgcolor: index % 2 === 0 ? 
                            (index % 3 === 0 ? colors.accentLight : colors.secondary) : 
                            (index % 3 === 0 ? colors.secondary : colors.accentLight),
                          color: index % 2 === 0 ? colors.accent : colors.primary,
                          borderColor: 'transparent',
                          boxShadow: 2
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  </Tooltip>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen && isMobile}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navegac;