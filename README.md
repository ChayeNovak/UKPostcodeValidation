# UKPostcodeValidation
PCF Component for Power Apps (Model-Driven + Canvas) which checks a postcode (single line text) field to ensure it matches a valid UK postcode. This is determined by Regex based upon UK government specifications with additions, thus does not require API access.

There were several driving factors behind why I created this PCF Component.

Firstly, and more importantly, it was as a response to user need. After speaking with some end-users, they stated that they would like colour highlighting of important
fields because it helps their workflow by knowing if an important field has been completed correctly or not. In addition to this, users wanted a consistent experience,
thus, the error message is styled to appear the same as a native Dynamics error message.

The secondary driving factors are that while there are other UK PostCode validation PCF Components exist, these all make use of third party APIs, which have
several inherent problems. Firstly, these services have varying pricing models, which when projects are scaled can become cumbersome, particularly to SMEs.
Another problem is that it means data is being sent to a third party, and some organisations due to security/regulartory requirements are not able to make external
requests from their environments to third party services. Lastly, it means there's a dependence on that third party service, thus meaning any outages etc that company
may have will impact user workflow.

## Video Install/Usage guide for Model-Driven and Canvas Apps:
https://youtu.be/9L_OfAuZVCw

## Instructions

### 1 - Download and Installation

First of all, you want to go to releases, then you want to download UK postcode, and click UKPostCodeValidation_managed.zip

Then you want to go to make.powerapps.com and select the solutions tab.

Click 'Import Solution', Browse, and select the 'UKPostCodeValidation_managed.zip' file you have downloaded.

Once that's done, press next and then you just want to wait for it to import.

### 2 - Implement in Model-Driven App
Once imported, go to your solution that contains your application, open up a form that contains a postcode field that you want the component to be applied to, 
for example the main account form, and once opened, click on the postcode field and press the + component icon at the bottom right, as per screenshot below:
![PowerApps form](https://user-images.githubusercontent.com/7072242/230998495-a7e3b989-f7c9-4870-a655-4f4e928ce276.PNG)

Now press save and publish, open up your model-driven app, open the corresponding record and the control should show (you may need to refresh the page a few times 
for the change to pull through).

Here's an example of how it looks when an incorrect postcode is supplied:
![MicrosoftTeams-image (3)](https://user-images.githubusercontent.com/7072242/230999356-9d0de436-63d8-4a41-97c2-1948511c71f7.png)

Here's an example of how it looks when a correct postcode is supplied:
![MicrosoftTeams-image (4)](https://user-images.githubusercontent.com/7072242/230999418-dbd019f2-a880-4407-85e5-15807dc7b03c.png)

### 3 - Implement in Canvas App

If you're going to be using this, for the Power Apps Canvas application, you first need to ensure that you can use code components with your canvas applications.

To do this, you first need to go to settings via the cogwheel at the top right, then click admin center. 

Open up the environment the solutions are contained within and go to settings again, go to product then features.

Scroll down and on the right hand side you'll see component framework for canvas apps and allow publishing a canvas app with code components.

Ensure this is sent to on and then press save at the bottom right.
![dataverse settings](https://user-images.githubusercontent.com/7072242/231001904-1e9b1989-9ff0-49b4-ab51-d94cdae265c2.PNG)

Once that's done open, create a solution and add a new Canvas application to it.

Open the canvas application you just created and once loaded, go to components, click the 3 dots and press 'import components'. Go to the code tab,
and click on UKPostCodeValidation then you want to go to add.

In your app, click on the + (add) tab on the left and under code components you can see there's a UK post code validation field. Drag this onto the canvas.

Now what you want to do is add a text input and place it on top of the postcode component.

Click the UKPostCodeValidation component and set the 'postCode' property to the Text value of the text input, for example, TextInput1.Text.

Try and enter in a postcode, this will then show an error if it's incorrect or be highlighted in green if correct.

You lastly want to ensure the component and the text input are aligned correctly. This and the aforementioned are depicted in the example images below:
Incorrect PostCode/Error
![MicrosoftTeams-image (5)](https://user-images.githubusercontent.com/7072242/231002849-24aace91-3f25-463f-8f09-19086e00e551.png)

Correct PostCode
![MicrosoftTeams-image (6)](https://user-images.githubusercontent.com/7072242/231002936-ee090b9c-90c5-44d4-ab01-c7ff7629e113.png)

This was mainly designed with Model-Driven Apps in mind, as this suited my needs, but as can be seen from the above, it can also be used for canvas apps.

There may be further enhancements to this, namely for the canvas app implementation, but for now, it is provided as is barring any major bugs.
