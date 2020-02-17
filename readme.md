# Annotation

Add annotation to your react components

## Installing

Download plugin</br>
Go to plugin folder</br>
In plugin folder use npm link  </br>
In your project you have to npm link Annotation</br>

## Usage

Import component </br>
```javascript
import { WrapperComponent, Trigger } from 'Annotation';
```

Wrap all your react code in 
```javascript
<WrapperComponent apiKey={'******'} projectID={'33'} user={'Tomek'} dev={true}>Your APP</WrapperComponent>
```
</br>
and then add 

```javascript
<Trigger groupID={7}>Component to which you want to add annotations</Trigger>
```

with unique groupID.</br>
