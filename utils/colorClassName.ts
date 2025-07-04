import type {colorNameType} from "~/types/colorName.type";

export const colorClassName = (color: colorNameType) => {
    switch (color) {
        case 'primary': return 'color-primary';
        case 'secondary': return 'color-secondary';
        case 'tertiary': return 'color-tertiary';
        case 'success': return 'color-success';
        case 'warning': return 'color-warning';
        case 'danger': return 'color-danger';
        case 'light': return 'color-light';
        case 'medium': return 'color-medium';
        case 'dark': return 'color-dark';
        default: console.warn('Unknown color:', color);
    }

    return '';
};