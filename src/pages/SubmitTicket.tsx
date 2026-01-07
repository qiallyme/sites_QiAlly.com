import { useEffect, useRef, useState } from 'react';
import { generateMetaTags } from '@qially/lib/seo';
import './SubmitTicket.css';

const SubmitTicket = () => {
	const seo = generateMetaTags({
		title: 'Submit Ticket — QiAlly',
		description: 'Submit a project ticket or bug report to QiAlly. Get help with your project issues.',
		canonical: 'https://qially.com/submit-ticket',
		site: 'qially.com',
	});

	const [captchaCode, setCaptchaCode] = useState('');
	const [filename, setFilename] = useState('');
	const [showFilename, setShowFilename] = useState(false);
	const captchaRef = useRef<HTMLCanvasElement>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		document.title = seo.title;
		const metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) metaDescription.setAttribute('content', seo.description);
		generateCaptcha();
		multiSelectWithoutCtrl();
		
		// Number field maxLength validation
		const numberFields = document.querySelectorAll('[type^="number"]');
		numberFields.forEach((element) => {
			element.addEventListener('keydown', (e: Event) => {
				const keyEvent = e as KeyboardEvent;
				const target = keyEvent.target as HTMLInputElement;
				const key = keyEvent.which || keyEvent.keyCode || 0;
				if (target.hasAttribute("maxLength") && 
					target.value?.length >= parseInt(target.getAttribute("maxLength") || "0") && 
					key >= 48 && key <= 57) {
					keyEvent.preventDefault();
				}
			});
		});
	}, []);

	const generateCaptcha = () => {
		if (!captchaRef.current) return;
		
		const charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%";
		const lengthOtp = 6;
		const captcha: string[] = [];
		
		for (let i = 0; i < lengthOtp; i++) {
			const index = Math.floor(Math.random() * charsArray.length + 1);
			if (captcha.indexOf(charsArray[index]) === -1) {
				captcha.push(charsArray[index]);
			} else {
				i--;
			}
		}
		
		const ctx = captchaRef.current.getContext('2d');
		if (ctx) {
			captchaRef.current.width = 100;
			captchaRef.current.height = 50;
			ctx.font = "25px Georgia";
			ctx.strokeText(captcha.join(""), 0, 30);
		}
		
		setCaptchaCode(captcha.join(""));
	};

	const multiSelectWithoutCtrl = () => {
		const options = document.querySelectorAll('[name^="UDF_NMULTI"] option');
		options.forEach((element) => {
			element.addEventListener("mousedown", function (e) {
				e.preventDefault();
				(element as HTMLElement).parentElement?.focus();
				(element as HTMLOptionElement).selected = !(element as HTMLOptionElement).selected;
				return false;
			}, false);
		});

		const multiFields = document.querySelectorAll('[name^="UDF_NMULTI"]');
		multiFields.forEach((element) => {
			element.addEventListener('focus', (event) => {
				(element as HTMLElement).blur();
			});
		});
	};

	const addAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setFilename(file.name);
			setShowFilename(true);
		}
	};

	const removeAttachment = () => {
		const fileInput = document.getElementById("uploadfile") as HTMLInputElement;
		if (fileInput) {
			fileInput.value = "";
		}
		setFilename("");
		setShowFilename(false);
	};

	const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const form = e.currentTarget;
		const formData = new FormData(form);
		
		// File size check
		const fileInput = form.querySelector('#uploadfile') as HTMLInputElement;
		if (fileInput?.files && fileInput.files[0]) {
			const fsize = fileInput.files[0].size / 1024 / 1024;
			if (fsize > 125) {
				alert("File size exceeds 125 MB");
				return false;
			}
		}

		// Ticket name validation
		const subject = (form.querySelector('[name="subject"]') as HTMLInputElement)?.value;
		if (!subject || subject.trim() === "") {
			alert("Please enter Ticket name");
			return false;
		}

		// Email validation
		const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value.trim();
		if (!email || email === "") {
			alert("Please enter a valid email address");
			return false;
		}
		
		const atpos = email.indexOf("@");
		const dotpos = email.lastIndexOf(".");
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
			alert("Please enter a valid email address");
			return false;
		}

		// Captcha validation
		const inputCaptcha = (form.querySelector('#input_captcha') as HTMLInputElement)?.value;
		if (!inputCaptcha || inputCaptcha !== captchaCode) {
			generateCaptcha();
			alert("Invalid Captcha");
			(form.querySelector('#input_captcha') as HTMLInputElement).value = "";
			return false;
		}

		// Mandatory fields check
		const mandatoryFields = form.querySelectorAll('[data-mand="true"]');
		for (let idx = 0; idx < mandatoryFields.length; idx++) {
			const currDiv = mandatoryFields[idx] as HTMLInputElement | HTMLSelectElement;
			if (currDiv.value === undefined || currDiv.value.trim() === '') {
				alert("The mandatory fields cannot be empty");
				return false;
			}
		}

		// Custom fields validation
		const customfields = form.getElementsByClassName("customFields");
		const maxFieldMaxLengths: { [key: string]: number } = { 'multiline': 1000, 'singleline': 150 };
		
		for (let i = 0; i < customfields.length; i++) {
			const field = customfields[i] as HTMLInputElement | HTMLSelectElement;
			const name = field.getAttribute("name");
			const fieldType = field.getAttribute("fieldType");
			const label = field.getAttribute("data-lable-name");

			if (fieldType === 'Date' && field.value != null && field.value !== "") {
				if (!field.value.match(/^(?:(0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])[\- \/.](19|20)[0-9]{2})$/)) {
					alert("Please enter a valid date");
					return false;
				}
			}

			if (fieldType === 'dateandtime' && field.value != null && field.value !== "") {
				if (!field.value.match(/^(?:(0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])[\- \/.](19|20)[0-9]{2}) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/)) {
					alert("Please enter a valid date");
					return false;
				}
			}

			if (name?.startsWith("UDF_NLONG") && field.value != null && field.value !== "") {
				if (!field.value.match(/^[0-9]\d*$/)) {
					alert(`Please enter numeric value for ${label}`);
					return false;
				}
			}

			if ((fieldType === 'multiuserpicklist' || fieldType === 'multipicklist') && 
				(field as HTMLSelectElement).selectedOptions.length > 20) {
				alert(`${label} cannot exceed 20 values`);
				return false;
			}

			if (fieldType === 'phone' && field.value !== '' && 
				(!field.value.match(/^[0-9-( )+]+$/) || field.value.length > 15)) {
				alert(`Enter a valid phone number in ${label}`);
				return false;
			}

			if (fieldType === 'email' && field.value !== "" && 
				!field.value.match(/^[\w](['A-Za-z0-9._%\-+]*@[A-Za-z0-9-]+(\.[a-zA-Z0-9-]{1,22}){0,9}\.[a-zA-Z]{2,22})$/)) {
				alert(`Enter a valid email ID in ${label}`);
				return false;
			}

			if (fieldType === 'url' && field.value !== "" && 
				!field.value.match(/^(?:(ftp|http|https):\/\/|www\.)?[a-zA-Z0-9]+([\-\.][a-zA-Z0-9]+){1,}(\.[a-zA-Z]{2,5})?(:[0-9]{1,5})?(\/.*)?$/)) {
				alert(`Enter a valid URL in ${label}`);
				return false;
			}

			if ((fieldType === 'decimal' || fieldType === 'currency') && field.value !== "" && 
				!(/^-{0,1}\d*\.{0,1}\d+$/.test(field.value))) {
				alert(`Please enter a valid value in ${label}`);
				return false;
			}

			if (fieldType === 'percentage' && field.value !== "" && 
				!(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(field.value))) {
				alert(`Please enter a valid value in ${label}`);
				return false;
			}

			if ((fieldType === 'multiline' || fieldType === 'singleline') && field.value !== "" && 
				field.value.length > maxFieldMaxLengths[fieldType]) {
				alert(`${label} cannot exceed ${maxFieldMaxLengths[fieldType]} characters`);
				return false;
			}
		}

		// Due date validation
		const dueDate = (form.querySelector('#dueDate') as HTMLInputElement)?.value;
		if (dueDate != null && dueDate !== "") {
			if (!dueDate.match(/^((0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-((19|20)\d\d))$/)) {
				alert("Please enter a valid date");
				return false;
			}
		}

		// Show confirmation dialog
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const handleConfirm = () => {
		if (dialogRef.current) {
			dialogRef.current.close();
		}
		const form = document.querySelector('form[name="fileabugform"]') as HTMLFormElement;
		if (form) {
			form.submit();
		}
	};

	const handleCancel = () => {
		if (dialogRef.current) {
			dialogRef.current.close();
		}
	};

	return (
		<section className="hero">
			<div className="hero-container">
				<h1 className="hero-title">Submit Ticket</h1>
				<p className="hero-description">Submit a project ticket or bug report</p>
			</div>
			<div className="container mt-12">
				<div className="webform-container">
					<dialog id="customConfirm" ref={dialogRef}>
						<div style={{ padding: '20px' }}>
							<p style={{ margin: '0px', fontSize: '15px', fontFamily: "'Roboto',sans-serif", fontWeight: 400 }} className="redirectmsghldr">
								Submitting this form will redirect you to <a target="_blank" href="https://qially.com/thanks" rel="noopener noreferrer">https://qially.com/thanks</a>. Do you want to continue?
							</p>
							<div style={{ marginTop: '30px', display: 'flex' }}>
								<button id="confirmBtn" className="primary-button" onClick={handleConfirm}>OK</button>
								<button id="cancelBtn" className="secondary-button" onClick={handleCancel}>Cancel</button>
							</div>
						</div>
					</dialog>
					<form name="fileabugform" action="https://projects.zoho.com/portal/qially/addbugfromiframe.do" method="post" encType="multipart/form-data" onSubmit={validateForm}>
						<input type="hidden" name="projId" value="projects-034ec36bcaca00e295405bf21a231f028777373bb6ce0c3e64a2cbd7dba0cc4e" />
						<input type="hidden" name="fId" value="projects-d105561b3b6802c840782f77742eb79a377459259ab6c4b1bae58f5451027d48" />
						<div className="webform-header">Submit Ticket</div>
						<div className="webform-data">
							<div className="webform-data-wrapper">
								<div className="web-form-field full-field">
									<label className="mandatory-field">Ticket Name</label>
									<input type="text" id="title" name="subject" defaultValue="" />
								</div>
								<div className="web-form-field full-field">
									<label>Ticket Description</label>
									<textarea id="description" name="desc" rows={4} style={{ height: '80px' }}></textarea>
								</div>
								<div className="web-form-field full-field">
									<label>Attach File</label>
									<div className="attachment-title">
										<span className="attachment-msg">Drop files or add attachments here...</span>
										<input type="file" id="uploadfile" name="uploadfile" onChange={addAttachment} className="attachment-input" />
									</div>
									{showFilename && (
										<div style={{ marginTop: '20px' }} className="attachment" id="filename" onClick={removeAttachment}>
											{filename}
										</div>
									)}
								</div>
								<div className="web-form-field half-field">
									<label className="mandatory-field">Email Address</label>
									<input type="text" name="email" />
								</div>
								<div className="web-form-field half-field">
									<label>Due Date<span style={{ fontSize: '12px', color: '#666', paddingLeft: '5px' }}>(MM-DD-YYYY)</span></label>
									<input type="text" name="Due Date" id="dueDate" placeholder="MM-DD-YYYY" />
								</div>
								<div className="web-form-field half-field">
									<label>Severity</label>
									<div className="webform-select-style">
										<select name="Severity" style={{ width: '100%', borderColor: '#e7e7e7', borderStyle: 'solid', borderWidth: '1px', color: '#3A3A3A', fontSize: '13px', fontWeight: 'normal', borderRadius: '3px', padding: '3px', height: '35px', outline: 'none', backgroundColor: '#fff' }} data-mand="false">
											<option value="projects-3b6e28c80718d10a3cd9cebede8088ec4398953713b6425a985efd67019dbea3">None</option>
											<option value="projects-3b6e28c80718d10a3cd9cebede8088ec355576cdaf0990be5df1ed628d8f2ae3">Show stopper</option>
											<option value="projects-3b6e28c80718d10a3cd9cebede8088ec4bc68813b1c5e47eb7a3ca144fc1453a">Critical</option>
											<option value="projects-3b6e28c80718d10a3cd9cebede8088ec2a8ea852ef9dd431adac3afc38092525">Major</option>
											<option value="projects-3b6e28c80718d10a3cd9cebede8088ec3d2ff6eed6d876b73b299437df77578c">Minor</option>
										</select>
									</div>
								</div>
								<div className="web-form-field full-field">
									<label>Enter Captcha</label>
									<div className="webform-field-style">
										<input type="text" id="input_captcha" />
										<span className="web-captcha">
											<span id="captcha">
												<canvas ref={captchaRef} id="captcha" width="100" height="50"></canvas>
											</span>
											<span style={{ fontFamily: 'Lucida Sans Unicode' }} className="captcha-refresh" onClick={generateCaptcha}>↻</span>
										</span>
									</div>
								</div>
								<div className="web-form-field full-field">
									<div style={{ lineHeight: '20px', color: '#ff4d47' }}>
										Note: Email ID is used to know the reporter of this bug. Submitting your email ID will not add you as a user or give you access to portal data.
									</div>
								</div>
								<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
									<button type="submit" value="Save" title="Save" className="primary-button">Save</button>
									<input type="reset" value="Cancel" title="Cancel" className="secondary-button" />
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default SubmitTicket;

