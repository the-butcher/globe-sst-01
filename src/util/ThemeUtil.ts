import { Theme, createTheme } from "@mui/material";

export class ThemeUtil {


    static getTheme(): Theme {

        const backgroundColor = 'rgba(77, 77, 68, 0.85)';
        const fontFamily = '"Courier Prime Sans", Consolas, Courier-New, monospace';
        return createTheme({
            components: {
                // Name of the component
                MuiButtonBase: {
                    styleOverrides: {
                        root: {
                            // backgroundColor: 'red'
                            // MuiButtonBase-root-MuiIconButton-root.Mui-disabled
                        }
                    }
                },
                MuiIconButton: {
                    styleOverrides: {
                        root: {
                            '&.Mui-disabled': {
                                color: 'inherit',
                                opacity: '0.5'
                            }
                        }
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            backgroundColor,
                            color: 'var(--color-text)',
                            fontSize: '10px',
                            '&:hover': {
                                border: '1px solid #2b2b27',
                                backgroundColor: 'rgba(77, 77, 68, 1)'
                            }
                        }
                    }
                },
                MuiTablePagination: {
                    styleOverrides: {
                        // actions: {
                        //   color: 'rgba(193, 193, 170, 0.33)',
                        // },
                        select: {
                            fontFamily,
                            color: 'var(--color-text)',
                        },
                        selectLabel: {
                            fontFamily,
                            color: 'var(--color-text)',
                        },
                        displayedRows: {
                            fontFamily,
                            color: 'var(--color-text)',
                        }
                    }
                },
                MuiTableCell: {
                    styleOverrides: {
                        root: {
                            fontFamily,
                            color: 'var(--color-text)',
                            borderBottom: '1px solid rgba(193, 193, 170, 0.33)',
                            padding: '3px 8px'
                            // fontSize: '10px',
                        }
                    }
                },
                MuiTableSortLabel: {
                    styleOverrides: {
                        root: {
                            fontFamily,
                            color: 'var(--color-text)',
                            '&.Mui-active': {
                                color: 'var(--color-text)',
                            },
                            '&.Mui-active .MuiTableSortLabel-icon': {
                                color: 'var(--color-text)',
                            },
                            '&:hover': {
                                color: 'var(--color-text)',
                            }
                        },

                    }
                },
                MuiButtonGroup: {
                    styleOverrides: {
                        grouped: {
                            minWidth: 'unset',
                            boxShadow: 'inherit',
                            border: '1px solid #2b2b27',
                            '&:not(:last-of-type):hover': {
                                borderRightColor: 'transparent'
                            }
                        }
                    }
                },
                // @ts-ignore
                MuiPickersDay: {
                    styleOverrides: {
                        root: {
                            backgroundColor: '#44443c',
                            fontFamily,
                            color: 'var(--color-text)',
                            paddingTop: '3px',
                            '&.Mui-selected': {
                                backgroundColor: 'var(--color-text)',
                                color: '#44443c',
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: 'var(--color-text)',
                                color: '#44443c',
                            },
                            '&:focus.Mui-selected': {
                                backgroundColor: 'var(--color-text)',
                                color: '#44443c',
                            }
                        },
                    }
                },
                MuiSvgIcon: {
                    styleOverrides: {
                        // root: {
                        //   color: 'rgba(193, 193, 170, 0.33)',
                        // },

                        // @ts-ignore
                        fontSizeMedium: {
                            width: '20px',
                            height: '20px'
                        }
                    }
                },
                MuiPaper: {
                    styleOverrides: {
                        // Name of the slot
                        root: {
                            // fontSize: '12px',
                            backgroundColor,
                            fontFamily,
                            color: 'var(--color-text)',
                            fontSize: '0.95em',
                            overflow: 'auto',
                            minWidth: '200px',
                        },
                    },
                },
                MuiCard: {
                    styleOverrides: {
                        root: {
                            backgroundColor,
                            fontFamily,
                            color: 'var(--color-text)',
                            overflow: 'auto',
                            minWidth: '150px',
                            margin: '3px',
                            padding: '0px',
                            paddingBottom: '0px'
                        },
                    },
                },
                MuiCardContent: {
                    styleOverrides: {
                        root: {
                            backgroundColor: 'unset',
                            fontFamily,
                            fontSize: '0.95em',
                            overflow: 'auto',
                            minWidth: '150px',
                            margin: '3px',
                            padding: '0px',
                            paddingBottom: '0px',
                            '&:last-child': {
                                paddingBottom: '0px'
                            }
                        }
                    },
                },
                MuiBreadcrumbs: {
                    styleOverrides: {
                        root: {
                            fontFamily,
                            fontSize: '14px',
                        },
                        ol: {
                            flexWrap: 'nowrap'
                        }
                    },
                },
                MuiAppBar: {
                    styleOverrides: {
                        root: {
                            fontFamily,
                            width: 'unset',
                            backgroundColor,
                            height: '50px',
                            padding: '0px'
                            // padding: '6px'
                        },
                    },
                },
                MuiToolbar: {
                    styleOverrides: {
                        // Name of the slot
                        root: {
                            fontFamily,
                            height: '48px',
                            minHeight: '48px',
                            color: 'var(--color-text)',
                            '@media (min-width: 600px)': {
                                minHeight: "48px"
                            }
                        },
                    },
                },
                MuiSelect: {
                    styleOverrides: {
                        icon: {
                            color: 'var(--color-text)',
                        }
                    }
                },
                MuiInput: {
                    styleOverrides: {
                        // Name of the slot
                        root: {
                            fontFamily,
                            fontSize: '14px',
                            color: 'var(--color-text)',
                            '&:after': {
                                borderBottom: '2px solid var(--color-text)'
                            }
                        },
                        input: {
                            padding: '0px'
                        }
                    },
                },
                MuiMenuItem: {
                    styleOverrides: {
                        root: {
                            fontFamily,
                            fontSize: '14px',
                            color: 'var(--color-text)',
                            backgroundColor,
                            padding: '2px 6px 2px 6px'
                        },
                    },
                },
                MuiSlider: {
                    styleOverrides: {
                        root: {
                            fontFamily,
                            fontSize: '10px',
                            color: 'var(--color-text)',
                            height: '1px',
                            padding: '10px 0px',
                            marginRight: '12px',
                            '@media (pointer: coarse)': {
                                padding: '10px 0px'
                            }
                        },
                        markLabel: {
                            fontFamily,
                            fontSize: '10px',
                            color: 'var(--color-text)',
                            top: '16px'
                        },
                        valueLabel: {
                            fontFamily,
                            fontSize: '14px',
                            color: 'var(--color-text)',
                            backgroundColor: '#42423a',
                            boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
                        }
                    },
                },
                // MuiSwitch: {
                //     styleOverrides: {
                //         root: {
                //             width: 'unset',
                //             padding: '12px 14px 10px 3px'
                //         },
                //         thumb: {
                //             marginTop: '4px',
                //             marginLeft: '0px',
                //             height: '10px',
                //             width: '10px',
                //             borderRadius: '2px',
                //         },
                //         track: {
                //             height: '12px',
                //             borderRadius: '3px',
                //             width: '18px',
                //             backgroundColor: '#36362f',
                //         },
                //         switchBase: {
                //             padding: '9px 4px',
                //             color: '#616155',
                //             '&.Mui-checked': {
                //                 color: '#c1c1aa',
                //                 transform: 'translateX(6px)',
                //                 '&+.MuiSwitch-track': {
                //                     backgroundColor: '#36362f',
                //                 }
                //             }
                //         }
                //     }
                // },
                MuiFormControl: {
                    styleOverrides: {
                        root: {
                            // width: '100%'
                        }
                    }
                },
                MuiFormControlLabel: {
                    styleOverrides: {
                        label: {
                            fontFamily,
                            fontSize: '10px',
                            color: 'var(--color-text)'
                        }
                    }
                }
            },
        });

    }

}