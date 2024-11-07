SELECT 
	Sessions.id,
	Professionals._name AS professionalName, 
	Professionals.phone AS professionalPhone,
	Clients._name AS clientName,
	Clients.phone AS clientPhone, 
	Sessions.price,
	Sessions.session_date AS sessionDate,	
	Sessions.payment_method AS paymentMethod,
	Sessions.session_note AS sessionNote,
	SessionType.session_name AS sessionName
FROM 
	Sessions
INNER JOIN 
	Clients ON Sessions.client_id = Clients.id
INNER JOIN 
	Professionals ON Sessions.professional_id = Professionals.id
INNER JOIN 
	SessionType ON Sessions.session_type = SessionType.id;
