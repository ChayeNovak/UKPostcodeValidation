/* eslint-disable no-undef */
import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class UKPostCodeValidation implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _context : ComponentFramework.Context<IInputs>;
	private _container: HTMLDivElement;
    private validation = new RegExp('^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$');
    private labelElement: HTMLLabelElement;
    private _inputElement: HTMLInputElement;
    private _value: string;
    private _notifyOutputChanged: () => void;
    private _refreshData: EventListenerOrEventListenerObject;
    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
{
    // Add control initialization code
    this._inputElement = document.createElement("input");
    this._inputElement.setAttribute("type", "text");
    this._inputElement.setAttribute("placeholder", "");
    this._value = context.parameters.postCode.raw!;
    this._inputElement.value = this._value;
    this._notifyOutputChanged = notifyOutputChanged;
    this._refreshData = this.refreshData.bind(this);
    this.labelElement = document.createElement("label");
    var errorIconLabelElement = document.createElement("label");
    errorIconLabelElement.innerHTML = "";
    errorIconLabelElement.classList.add("icon");
    
    var errorLabelElement = document.createElement("label");
    errorLabelElement.innerHTML = context.resources.getString("This is not a valid UK postcode.");
    
    this._container = document.createElement("div");
    this._container.classList.add("Error");
    this._container.appendChild(errorIconLabelElement);
    this._container.appendChild(errorLabelElement);

    if(this.validation.test(context.parameters.postCode.raw!) == true && context.parameters.postCode.raw!.length > 0) {
        this._inputElement.setAttribute("style", "background: green");
        this.labelElement.innerHTML = "Success";
    } else if (context.parameters.postCode.raw!.length == 0) {
        this._inputElement.setAttribute("style", "background: white");
    } else {
        this._inputElement.setAttribute("style", "background: red");
    }
    container.appendChild(this._inputElement);
    container.appendChild(this._container); // append error container after input container

    this._inputElement.addEventListener("input", this._refreshData); // register refreshData event listener
}


    public refreshData(evt: Event): void {
        this._value = (this._inputElement.value as any) as string;
        this.labelElement.innerHTML = this._inputElement.value;
        this._notifyOutputChanged();
     }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
{
    if(this.validation.test(context.parameters.postCode.raw!) == true && context.parameters.postCode.raw!.length > 0) {
        this._inputElement.setAttribute("style", "background: green");
        this.labelElement.innerHTML = "Success";
        this._container.style.display = "none"; // Hide the error container
    } else if (context.parameters.postCode.raw!.length == 0) {
        this._inputElement.setAttribute("style", "background: white");
        this._container.style.display = "none"; // Hide the error container
    } else {
        this._inputElement.setAttribute("style", "background: red");
        this._container.style.display = "block"; // Display the error container
    }
    this._inputElement.setAttribute("value", context.parameters.postCode.formatted ? context.parameters.postCode.formatted : "");
}

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {postCode: this._value};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
        this._inputElement.removeEventListener("input", this._refreshData);
    }
}
