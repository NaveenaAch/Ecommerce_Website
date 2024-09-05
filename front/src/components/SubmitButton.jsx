import { Button } from "react-bootstrap";

export const SubmitButton = ({loading, icon, label, variant="dark"}) => 
    <Button type="submit" variant={variant} disabled={loading}>
        <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : icon} me-2`}></i>{label}
    </Button>