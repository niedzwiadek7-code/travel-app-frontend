import React, { ReactNode, useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Chip,
} from '@mui/material'
import {
  Menu as MenuIcon,
  AccountCircle,
  Language,
  Logout,
  ManageSearch, Create,
  List as ListIcon, FlightTakeoff,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { lighten, darken } from '@mui/material/styles'
import { Pages } from '../../../pages/pages'
import { useAuth } from '../../../context'
import { Roles } from '../../../model'
import { useRouter } from '../../../hooks'
import { reset as resetTravelInstance } from '../../../features/travelInstance/travelInstanceSlice'
import { reset as resetTravelRecipe } from '../../../features/travelRecipe/travelRecipeSlice'
import { useAppDispatch } from '../../../app/hooks'

type NavigationItem = {
  icon: ReactNode
  text: string
  path: string
  state?: Record<string, any>
  isActive: () => boolean
}

const PublicLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme()
  const { t } = useTranslation('translation', { keyPrefix: 'auth_layout' })
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [languageEl, setLanguageEl] = useState<null | HTMLElement>(null)
  const { i18n } = useTranslation()
  const {
    roles, setLoggedIn, setToken, setRoles,
  } = useAuth()
  const dispatch = useAppDispatch()
  const { navigate, pathname, state } = useRouter<Record<string, any>, {}, {}>()

  const navigationItems: NavigationItem[] = [
    // {
    //   icon: <Home />,
    //   text: t('home'),
    //   link: Pages.
    // },
    {
      icon: <Create />,
      text: t('trip_creator'),
      path: Pages.CREATE_TRAVEL.getRedirectLink(),
      isActive: () => pathname === Pages.CREATE_TRAVEL.getRedirectLink(),
    },
    {
      icon: <ListIcon />,
      text: t('trip_plans'),
      path: Pages.TRAVEL_RECIPES_STORE.getRedirectLink(),
      isActive: () => pathname === Pages.TRAVEL_RECIPES_STORE.getRedirectLink(),
    },
    {
      icon: <FlightTakeoff />,
      text: t('ongoing_trips'),
      path: Pages.REALIZED_TRIPS.getRedirectLink(),
      isActive: () => pathname === Pages.REALIZED_TRIPS.getRedirectLink(),
    },
  ]

  if (roles?.includes(Roles.ADMIN)) {
    navigationItems.push({
      icon: <ManageSearch />,
      text: t('manage_activities'),
      path: Pages.LIST_ACTIVITY.getRedirectLink(),
      isActive: () => state?.admin,
      state: {
        admin: true,
        source: 'toAccept',
      },
    })
  }

  const languages = ['en', 'pl']

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageEl(event.currentTarget)
  }

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setLanguageEl(null)
  }

  const logout = () => {
    setLoggedIn(false)
    setToken(undefined)
    setRoles([])
    dispatch(resetTravelInstance())
    dispatch(resetTravelRecipe())
    navigate(Pages.LOGIN.getRedirectLink())
  }

  const drawerContent = (
    <Box sx={{ p: 1, overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        {t('navigation')}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.text}
            sx={{
              borderRadius: 2,
              mb: 1,
              bgcolor: item.isActive() ? lighten(theme.palette.primary.main, 0.1) : 'inherit',
              color: item.isActive() ? 'white !important' : 'inherit',
              '&:hover': {
                backgroundColor: item.isActive()
                  ? lighten(theme.palette.primary.main, 0.2)
                  : theme.palette.action.hover,
              },
            }}
            onClick={() => {
              navigate(item.path, { state: item.state || undefined })
              handleClose()
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: item.isActive() ? 'white !important' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: darken(theme.palette.background.default, 0.03),
          color: theme.palette.text.primary,
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Travel App
          </Typography>

          {/* Language Selector */}
          <IconButton onClick={handleLanguageMenu} sx={{ mr: 1 }}>
            <Language />
          </IconButton>
          <Menu
            anchorEl={languageEl}
            open={Boolean(languageEl)}
            onClose={handleClose}
          >
            {languages.map((lang) => (
              <MenuItem
                key={lang}
                onClick={() => changeLanguage(lang)}
                sx={{
                  backgroundColor: lang === i18n.language ? lighten(theme.palette.primary.main, 0.1) : 'inherit',
                  color: lang === i18n.language ? 'white !important' : 'inherit',
                  '&:hover': {
                    backgroundColor: lang === i18n.language ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <Chip
                  label={lang.toUpperCase()}
                  size="small"
                  sx={{
                    color: lang === i18n.language ? 'white !important' : 'inherit',
                    mr: 1,
                  }}
                />
                {t(`${lang}`)}
              </MenuItem>
            ))}
          </Menu>

          {/* User Menu */}
          <IconButton onClick={handleMenu}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              {t('logout')}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      {!isMobile ? (
        <Drawer
          variant="permanent"
          sx={{
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              borderRight: `1px solid ${theme.palette.divider}`,
              bgcolor: lighten(theme.palette.background.default, 0.05),
              color: theme.palette.text.primary,
              overflow: 'hidden',
              height: '100vh',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              borderRight: `1px solid ${theme.palette.divider}`,
              bgcolor: lighten(theme.palette.background.default, 0.05),
              color: theme.palette.text.primary,
              overflow: 'hidden',
              height: '100vh',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 1, md: 10 },
          pt: 12,
          pb: 4,
          mt: 8,
          overflowX: 'hidden',
          maxWidth: '1000px',
          margin: '0 auto',
          width: { md: 'calc(100% - 280px)' },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default PublicLayout
