/**
  * @param {org.bharatchain.sendTransaction} tx 
   * @transaction 
   */
function sendTransaction(tx) {
       
    var newValue = tx.value;
   // Save the old value of the asset.
    var oldValue = tx.asset.value;
  
	if ( tx.value > oldValue ) {
        throw new Error('You don\'t have enough balance');
    }
  	if( tx.asset.owner.type == 'GOVERNMENT'){
    	
      	tx.asset.value = oldValue - newValue;
      	var reciever_tx_asset_owner = tx.to;
        var reciever_tx_value = newValue;
        var reciever_tx_asset_assetId = tx.assetId;
		//var reciever_tx_asset_assettype_type = 'Generic';
        // Get the asset registry for the asset
      	
        return getAssetRegistry('org.bharatchain.Lakshmi')
            .then(function (assetRegistry) {

                // Update the asset in the asset registry.
                return assetRegistry.update(tx.asset);

            })
      		.then(function() {
            return getAssetRegistry('org.bharatchain.Lakshmi')
        	})
      		.then(function (assetRegistry) {

                // Update the asset in the asset registry.
          		var factory = getFactory();
    			var reciever_asset = factory.newResource('org.bharatchain', 'Lakshmi', reciever_tx_asset_assetId);
          		reciever_asset.owner = reciever_tx_asset_owner;
          		reciever_asset.value = reciever_tx_value;
          		reciever_asset.assettype = tx.asset.assettype;
          		reciever_asset.issuer = tx.asset.issuer;
          		reciever_asset.description = tx.asset.description;
                return assetRegistry.add(reciever_asset);

            });
      		
      		
    }
  	else if( tx.asset.assettype.type == 'Generic'){
  		
        // Update the asset with the new value.
        tx.asset.value = oldValue - newValue;
      	var reciever_tx_asset_owner = tx.to;
        var reciever_tx_value = newValue;
        var reciever_tx_asset_assetId = tx.assetId;
		//reciever_tx.asset.assettype.type = 'Generic';
        // Get the asset registry for the asset.
        return getAssetRegistry('org.bharatchain.Lakshmi')
            .then(function (assetRegistry) {

                // Update the asset in the asset registry.
                return assetRegistry.update(tx.asset);

            })
      		.then(function() {
            return getAssetRegistry('org.bharatchain.Lakshmi')
        	})
      		.then(function (assetRegistry) {

                // Update the asset in the asset registry.
          		var factory = getFactory();
    			var reciever_asset = factory.newResource('org.bharatchain', 'Lakshmi', reciever_tx_asset_assetId);
          		reciever_asset.owner = reciever_tx_asset_owner;
          		reciever_asset.value = reciever_tx_value;
          		reciever_asset.assettype = tx.asset.assettype;
          		reciever_asset.issuer = tx.asset.issuer;
          		reciever_asset.description = tx.asset.description;
                return assetRegistry.add(reciever_asset);

            });
  	  
    }
  	else{
      	
        
    	var sender_asset_assettype  = tx.asset.assettype.tags;
      	var reciever_assetType = tx.to.assetType;
      	var check = 0;
      	 for (var i = 0; i < sender_asset_assettype.length; ++i){ 
         	for(var j = 0; j < reciever_assetType.length;++j){
               if (sender_asset_assettype[i] == reciever_assetType[j]){
                  check = 1;
                 break;
               }
            }
            if(check == 1) break;
         }
        
      	if(check != 1){
        	throw new Error('You are not allowed to spend here.');
        }
		
      	tx.asset.value = oldValue - newValue;
      	var reciever_tx_asset_owner = tx.to;
        var reciever_tx_value = newValue;
        var reciever_tx_asset_assetId = tx.assetId;
		var reciever_tx_asset_assettype_type;
      	// Get the asset registry for the asset.
        return getAssetRegistry('org.bharatchain.Lakshmi')
            .then(function (assetRegistry) {

                // Update the asset in the asset registry.
                return assetRegistry.update(tx.asset);

            })
      		.then(function() {
            return getAssetRegistry('org.bharatchain.LakshmiType')
        	})
      		.then(function (assetRegistry) {
      			return assetRegistry.get('Generic');
        	})
      		.then(function (assettype) {
        		
     
    			reciever_tx_asset_assettype_type = assettype;
  			})
      		.then(function() {
            return getAssetRegistry('org.bharatchain.Lakshmi')
        	})
      		.then(function (assetRegistry) {

                // Update the asset in the asset registry.
          		var factory = getFactory();
    			var reciever_asset = factory.newResource('org.bharatchain', 'Lakshmi', reciever_tx_asset_assetId);
          		reciever_asset.owner = reciever_tx_asset_owner;
          		reciever_asset.value = reciever_tx_value;
          		reciever_asset.assettype = reciever_tx_asset_assettype_type;
          		reciever_asset.issuer = tx.asset.issuer;
          		reciever_asset.description = tx.asset.description;
                return assetRegistry.add(reciever_asset);

            });
    }
  
}

